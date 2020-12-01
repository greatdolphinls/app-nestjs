import { Types } from 'mongoose';

export interface IUserIdentityCreate {
  password: string;
  username: string;
  _user: Types.ObjectId;
}
