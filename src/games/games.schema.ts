import * as mongoose from 'mongoose';

const schemaData = {
  name: { type: String, required: true, unique: true },
  coverImage: {
    original: { type: String },
    thumbnail: { type: String },
  },
  consoleList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game.Console' }],
};

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};

export const gameSchema = new mongoose.Schema(schemaData, schemaOptions);
