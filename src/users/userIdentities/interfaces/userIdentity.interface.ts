import { Types } from 'mongoose';

export interface IUserIdentityModelData {
  passwordHash: string;
  username: string;
  _user: Types.ObjectId | any;
  tokens?: {
    refreshToken: string;
    passwordForgotToken: {
      value: string;
      expirationDate: string;
    }
  };
  activationCode: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserIdentity extends IUserIdentityModelData {
  _id?: Types.ObjectId;
}
