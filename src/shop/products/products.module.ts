import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productSchema } from './products.schema';
import { ProductsRepository } from './products.repository';
import { UserWalletsModule } from '../../userWallets/userWallets.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Shop.Product', schema: productSchema }]),
    UserWalletsModule,
    forwardRef(() => OrdersModule),
  ],
  providers: [
    ProductsService,
    ProductsRepository,
  ],
  exports: [
    ProductsService,
    ProductsRepository,
  ],
  controllers: [
    ProductsController,
  ],
})
export class ProductsModule {

}
