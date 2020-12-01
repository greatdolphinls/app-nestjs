import * as mongoose from 'mongoose';
import { EOrderStatuses } from './enums/orderStatuses.enum';
import { EOrderCurrency } from './enums/orderCurrency.enum';
import { EOrderTypes } from './enums/orderTypes.enum';

const schemaData = {
  _product: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop.Product' },
  _createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User.Profile' },
  totalPrice: { type: Number, min: 0, required: true },
  currency: { type: String, enum: Object.values(EOrderCurrency) },
  status: { type: String, enum: Object.values(EOrderStatuses), default: EOrderStatuses.PENDING, required: true },
  type: { type: String, enum: Object.values(EOrderTypes), required: true },
  value: { type: Number },
  _skin: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop.Skin' },
  paymentInfo: {
    status: { type: String, enum: Object.values(EOrderStatuses) },
    transactionReceipt: { type: Object },
  },
};

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};

export const orderSchema = new mongoose.Schema(schemaData, schemaOptions);
