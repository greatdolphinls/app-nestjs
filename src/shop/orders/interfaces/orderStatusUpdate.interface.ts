import { EOrderStatuses } from '../enums/orderStatuses.enum';
import { IOrderPayment } from './orderPayment.interface';

export interface IOrderStatusUpdate {
  status: EOrderStatuses;
  paymentInfo?: IOrderPayment;
}
