import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DbEntityService } from '../../shared/services/dbEntity.service';
import { IOrder, IOrderModelData } from './interfaces';

interface IOrderModel extends IOrderModelData, Document { }

@Injectable()
export class OrdersRepository extends DbEntityService<Model<IOrderModel>, IOrder, any> {
  constructor(
    @InjectModel('Shop.Order')
    readonly model: Model<IOrderModel>,
  ) {
    super(model);
  }
}
