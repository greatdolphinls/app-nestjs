import { IOrderPayment } from './interfaces';

export class OrderPaymentsService {
  // constructor() { }

  public isPaymentInfoValid(_paymentInfo: IOrderPayment): Promise<boolean> {
    return Promise.resolve(true);
  }
}
