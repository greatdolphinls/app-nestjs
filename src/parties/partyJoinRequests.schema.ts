import * as mongoose from 'mongoose';

const schemaData = {
  _party: { type: mongoose.Schema.Types.ObjectId, ref: 'Game.Event', unique: true },
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User.Profile' },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User.Profile' },
};

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};

export const partyJoinRequestSchema = new mongoose.Schema(schemaData, schemaOptions);
