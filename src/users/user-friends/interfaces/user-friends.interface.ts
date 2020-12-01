import { Types, Document } from 'mongoose';
import { EUserFreindsStatus } from '../enums/userFreindsStatus.enum';

export interface IUserFriendModelData {
  _userFrom: string;
  _userTo: string;
  status?: EUserFreindsStatus;
}

export interface IUserFriend extends IUserFriendModelData {
  _id?: Types.ObjectId;
}

export interface IUserFriendModel extends IUserFriendModelData, Document { }
