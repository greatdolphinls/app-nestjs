import * as mongoose from 'mongoose';

const schemaData = {
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  tokens: {
    refreshToken: { type: String },
    passwordForgotToken: {
      value: { type: String },
      expirationDate: { type: String },
    },
  },
  isActive: { type: Boolean, default: false },
  activationCode: { type: String },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User.Profile' },
};

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};

export const userIdentitySchema = new mongoose.Schema(schemaData, schemaOptions);
