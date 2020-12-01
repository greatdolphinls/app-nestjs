import * as mongoose from 'mongoose';
import { EUserRole } from './enums/userRoles.enum';

const schemaData = {
  email: { type: String, unique: true, required: true, index: true },
  nickname: { type: String, trim: true, index: true, unique: true, sparse: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  referralCode: { type: String, unique: true },
  stats: {
    joinedParties: { type: Number, min: 0, default: 0 },
    hostedParties: { type: Number, min: 0, default: 0 },
    pointsSeason: { type: Number, min: 0, default: 0 },
    ratingPosition: { type: Number, min: 0, default: 0 },
  },
  roles: { type: Array, default: [EUserRole.USER_REGULAR], required: true },
  skins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop.Skin' }],
  skinSelected: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop.Skin' },
};

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};

export const userProfileSchema = new mongoose.Schema(schemaData, schemaOptions);
