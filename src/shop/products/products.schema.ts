import * as mongoose from 'mongoose';
import { EProductTypes } from './enums/productTypes.enum';
import { EProductCurrency } from './enums/productCurrency.enum';

const schemaData = {
  name: { type: String, required: true, unqiue: true, index: true },
  price: { type: Number, required: true, min: 0, default: 0 },
  currency: { type: String, enum: Object.values(EProductCurrency)  },
  type: { type: String, enum: Object.values(EProductTypes), required: true },
  value: { type: Number },
  inAppPurshaseId: { type: String, unqiue: true },
  _skin: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop.Skin' },
  coverImage: {
    original: { type: String },
    thumbnail: { type: String },
  },
  description: { type: String },
};

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};

export const productSchema = new mongoose.Schema(schemaData, schemaOptions);
