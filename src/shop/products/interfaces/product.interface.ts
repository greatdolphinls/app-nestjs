import { Types } from 'mongoose';
import { EProductTypes } from '../enums/productTypes.enum';
import { EProductCurrency } from '../enums/productCurrency.enum';

export interface IProductModelData {
  name: string;
  price: number;
  currency: EProductCurrency;
  coverImage?: {
    original: string;
    thumbnail: string;
  };
  type: EProductTypes;
  value?: number;
  description?: string;
  _skin?: string;
}

export interface IProduct extends IProductModelData {
  _id?: Types.ObjectId;
}
