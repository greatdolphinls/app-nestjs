import { Types } from 'mongoose';
import { EOrderStatuses } from '../enums/orderStatuses.enum';
import { EOrderCurrency } from '../enums/orderCurrency.enum';
import { EOrderTypes } from '../enums/orderTypes.enum';

import { IOrderPayment } from '../interfaces/orderPayment.interface';

export interface IOrderModelData {
  _product: string;
  _createdBy?: string;
  totalPrice?: number;
  currency?: EOrderCurrency;
  status?: EOrderStatuses;
  paymentInfo?: IOrderPayment;
  type?: EOrderTypes;
  value?: number;
  _skin ?: string;
}

export interface IOrder extends IOrderModelData {
  _id?: Types.ObjectId;
}
