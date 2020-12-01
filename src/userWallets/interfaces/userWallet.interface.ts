import { Types } from 'mongoose';

export interface IUserWalletModelData {
  _user: string;
  amount: number;
}

export interface IUserWallet extends IUserWalletModelData {
  _id?: Types.ObjectId;
}
