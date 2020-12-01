import { EOrderStatuses } from '../enums/orderStatuses.enum';

export interface IOrderPayment {
  status: EOrderStatuses;
  transactionReceipt?: object;
}
