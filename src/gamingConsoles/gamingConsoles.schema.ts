import * as mongoose from 'mongoose';

const schemaData = {
  name: { type: String, required: true, unique: true },
  icon: {
    original: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
};

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};

export const gamingConsoleSchema = new mongoose.Schema(schemaData, schemaOptions);
