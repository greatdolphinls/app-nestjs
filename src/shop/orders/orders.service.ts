import { BadRequestException, NotFoundException, ConflictException, ForbiddenException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { ProductsService } from '../products/products.service';
import { UserWalletsService } from '../../userWallets/userWallets.service';
import { UserProfilesService } from '../../users/userProfiles/userProfiles.service';

import { OrderDto } from './dto';
import { IOrder, IOrderPayment, IOrderStatusUpdate } from './interfaces/';
import { IProduct } from '../products/interfaces';
import { EOrderStatuses } from './enums/orderStatuses.enum';
import { EOrderTypes } from './enums/orderTypes.enum';
import { EProductTypes } from '../products/enums/productTypes.enum';
import { EProductCurrency } from '../products/enums/productCurrency.enum';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
    private readonly userWalletsService: UserWalletsService,
    private readonly userProfilesService: UserProfilesService,
  ) { }

  private async validateOrderId(orderId: string): Promise<IOrder> {
    const orderFound = await this.orderRepository.findById(orderId);

    if (!orderFound) {
      throw new NotFoundException('ERR_NOT_FOUND_ORDER_ID');
    }

    if (orderFound.status !== EOrderStatuses.PENDING) {
      throw new ConflictException('ERR_ORDER_NOT_PROCESSABLE_STATUS');
    }

    return orderFound;
  }

  private async createInternalOrder(createData: OrderDto): Promise<IOrder> {
    switch (createData.type) {
      case EOrderTypes.REWARD:
        await this.userWalletsService.refillForUser(createData._createdBy, createData.value);
        break;
      case EOrderTypes.SKIN:
        await this.userWalletsService.deductFromUser(createData._createdBy, createData.totalPrice);
        await this.userProfilesService.addSkin(createData._createdBy, createData._skin);
        break;
    }

    createData.status = EOrderStatuses.APPROVED;
    const orderCreated = await this.orderRepository.createOne(createData);

    return orderCreated;
  }

  private async createPaidOrder(createData: OrderDto): Promise<IOrder> {
    return this.orderRepository.createOne(createData);
  }

  private approveOrder(orderId: string, paymentInfo?: IOrderPayment): Promise<IOrder> {
    const updateObject: IOrderStatusUpdate = { status: EOrderStatuses.APPROVED };

    if (paymentInfo) {
      updateObject.paymentInfo = paymentInfo;
    }
    return this.orderRepository.findAndUpdateById(orderId, updateObject);
  }

  private rejectOrder(orderId: string, paymentInfo?: IOrderPayment): Promise<IOrder> {
    const updateObject: IOrderStatusUpdate = { status: EOrderStatuses.REJECTED };

    if (paymentInfo) {
      updateObject.paymentInfo = paymentInfo;
    }
    return this.orderRepository.findAndUpdateById(orderId, updateObject);
  }

  private cancelOrder(orderId: string, paymentInfo?: IOrderPayment): Promise<IOrder> {
    const updateObject: IOrderStatusUpdate = { status: EOrderStatuses.CANCELED };

    if (paymentInfo) {
      updateObject.paymentInfo = paymentInfo;
    }
    return this.orderRepository.findAndUpdateById(orderId, updateObject);
  }

  public async createOneByUser(userId: string, createData: OrderDto): Promise<IOrder> {
    const productFound: IProduct = await this.productsService.getOne((createData._product));
    if (!productFound) {
      throw new BadRequestException('ERR_INVALID_PRODUCT_ID');
    }

    createData.totalPrice = productFound.price;
    createData.currency = productFound.currency;
    createData._createdBy = userId;
    createData.type = productFound.type;
    createData.value = productFound.value;
    createData._skin = productFound._skin;

    if (productFound.currency === EProductCurrency.LAN ||
      productFound.type === EProductTypes.REWARD) {
      return this.createInternalOrder(createData);
    }

    return this.createPaidOrder(createData);
  }

  /**
   * Handles Paid Order (paid by real money)
   * @param orderId
   * @param paymentInfo
   */
  public async processPaidOrder(userId: string, orderId: string, paymentInfo: IOrderPayment): Promise<IOrder> {

    const orderFound = await this.validateOrderId(orderId);

    if (orderFound._createdBy.toString() !== userId.toString()) {
      throw new ForbiddenException('ERR_FORBIDDEN_ORDER');
    }

    if (paymentInfo.status === EOrderStatuses.REJECTED) {
      await this.rejectOrder(orderId, paymentInfo);
      throw new BadRequestException('ERR_INVALID_PAYMENT');
    }

    if (paymentInfo.status === EOrderStatuses.CANCELED) {
      await this.cancelOrder(orderId, paymentInfo);
      throw new BadRequestException('ERR_INVALID_PAYMENT');
    }

    const refillWallet = this.userWalletsService.refillForUser(orderFound._createdBy, orderFound.value);
    const orderUpdated = this.approveOrder(orderId, paymentInfo);

    const result  = await Promise.all([refillWallet, orderUpdated]);

    return result[1];
  }

  public getRewardOrdersForThisDayByUserId(userId) {
    const todayStart = new Date(new Date().setHours(0, 0, 0));
    const todayEnd = new Date(new Date().setHours(23, 59, 59));

    return this.orderRepository.findMany({
      where: {
        _createdBy: userId,
        createdAt: {
          $gte: todayStart,
          $lt: todayEnd,
        },
      },
    });
  }
}
