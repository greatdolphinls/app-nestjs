import { Types } from 'mongoose';

export interface IPartyJoinRequestModelData {
  _host: string;
  _user: string;
  _party: string;
}

export interface IPartyJoinRequest extends IPartyJoinRequestModelData {
  _id?: Types.ObjectId;
}
