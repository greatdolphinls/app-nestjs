import { Injectable, NotFoundException, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductDto, ProductUpdateDto, FindManyProductDto } from './dto';
import { IProduct } from './interfaces/';
import { UsersService } from '../../users/users.service';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => OrdersService)) // TODO: remove circular reward go to his own module.
    private readonly ordersService: OrdersService,
  ) { }

  public async createOne(createData: ProductDto): Promise<IProduct> {
    const productFound = await this.productsRepository.findByName(createData.name);

    if (!productFound) {
      return this.productsRepository.createOne(createData);
    }
    throw new ConflictException('ERR_EXISTS_PRODUCT_NAME');
  }

  public async getOne(productId: string): Promise<IProduct> {
    const productFound = await this.productsRepository.findById(productId);
    if (productFound) {
      return productFound;
    }

    throw new NotFoundException('ERR_NOT_FOUND_PRODUCT_ID');
  }

  public async updateOne(productId: string, updateData: ProductUpdateDto): Promise<IProduct> {
    const productFound = await this.productsRepository.findById(productId);
    if (!productFound) {
      throw new NotFoundException('ERR_NOT_FOUND_PRODUCT_ID');
    }

    if (!updateData.name || (updateData.name === productFound.name)) {
      return this.productsRepository.findAndUpdateById(productId, updateData);
    }

    const productFoundByName = await this.productsRepository.findByName(updateData.name);

    if (!productFoundByName) {
      return this.productsRepository.findAndUpdateById(productId, updateData);
    }

    throw new ConflictException('ERR_EXISTS_PRODUCT_NAME');
  }

  public async deleteOne(productId: string): Promise<boolean> {
    const productFound = await this.productsRepository.findById(productId);
    if (productFound) {
      return this.productsRepository.deleteById(productId);
    }
    throw new NotFoundException('ERR_NOT_FOUND_PRODUCT_ID');
  }

  public getMany({ ...query }: FindManyProductDto) {
    query.include = '_skin';
    return this.productsRepository.findMany(query);
  }

  // TODO: seperate reward to new collection with it's logique
  public async getReward({ ...query }: FindManyProductDto, userId: string) {
    // check if the user create account less than 90 day ago.
    const profile = await this.usersService.getById(userId);
    if (!profile || !profile.createdAt) {
      return [];
    } else {
      const numberOfDaysAfterSubscription = ((Date.now() - new Date(profile.createdAt).getTime()) / (1000 * 60 * 60 * 24));
      if (numberOfDaysAfterSubscription >= 90) {
        return [];
      }
    }
    // get the orders of the user
    const rewardOrderForTheDay = await this.ordersService.getRewardOrdersForThisDayByUserId(userId);

    if (rewardOrderForTheDay.length > 0) {
      return [];
    }
    const shopQuery = {
      $or: [{
        type: 'reward',
      }],
    };
    const whereQuery = query.where || {};
    query.where = { ...whereQuery, ...shopQuery };
    return this.productsRepository.findMany(query);
  }

  public getShop({ ...query }: FindManyProductDto) {
    const shopQuery = {
      $or: [{
        type: 'lan',
      }, {
        type: 'skin',
      }],
    };
    const whereQuery = query.where || {};
    query.where = { ...whereQuery, ...shopQuery };
    return this.productsRepository.findMany(query);
  }

  public countAll(query: any): Promise<number> {
    return this.productsRepository.countAll(query);
  }
}
