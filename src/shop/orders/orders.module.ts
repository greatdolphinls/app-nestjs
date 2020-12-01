import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderPaymentsService } from './orderPayments.service';
import { orderSchema } from './orders.schema';
import { OrdersRepository } from './orders.repository';

import { ProductsModule } from '../products/products.module';
import { UserWalletsModule } from '../../userWallets/userWallets.module';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Shop.Order', schema: orderSchema }]),
    forwardRef(() => ProductsModule),
    UserWalletsModule,
    UsersModule,
  ],
  providers: [
    OrdersService,
    OrderPaymentsService,
    OrdersRepository,
  ],
  exports: [
    OrdersService,
    OrdersRepository,
  ],
  controllers: [
    OrdersController,
  ],
})
export class OrdersModule {

}
