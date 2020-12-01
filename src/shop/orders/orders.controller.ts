import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Param,
  Req,
  UsePipes,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { OrdersService } from './orders.service';
import { OrderProcessDto, OrderParamDto, OrderCreateDto } from './dto';

const ENTITY = 'Orders';

@ApiUseTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  async createOne(@Body() newOrderData: OrderCreateDto, @Req() { user }) {
    const result = await this.ordersService.createOneByUser(user._id, newOrderData);
    return { _id: result._id };
  }

  @Post('/:orderId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @ApiImplicitParam({ name: 'orderId', type: String, required: true })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully processed.` })
  @ApiResponse({ status: 404, description: `${ENTITY} not found.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  async processOne(@Body() orderProcessDto: OrderProcessDto, @Param() { orderId }: OrderParamDto, @Req() { user }) {
    const result = await this.ordersService.processPaidOrder(user._id, orderId, orderProcessDto.paymentInfo);
    return { _id: result._id };
  }
}
