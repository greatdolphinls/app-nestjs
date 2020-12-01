import * as mongoose from 'mongoose';

const schemaData = {
  _user: { type: String, required: true },
  amount: { type: Number, min: 0, required: true },
};

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};

export const userWalletSchema = new mongoose.Schema(schemaData, schemaOptions);
