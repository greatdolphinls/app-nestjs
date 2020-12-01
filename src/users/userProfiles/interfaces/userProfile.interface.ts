import { Types } from 'mongoose';
import { EUserRole } from '../enums/userRoles.enum';

export interface IUserProfileModelData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  referralCode?: string;
  roles?: EUserRole;
  nickname?: string;
  skinSelected?: string;
  createdAt?: string;
}

export interface IUserProfile extends IUserProfileModelData {
  _id?: Types.ObjectId;
}
