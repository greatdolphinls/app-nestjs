import * as mongoose from 'mongoose';

import { EPartyPlaceTypes } from './enums/partyPlaces.enum';
import { EPartyPrivacies } from './enums/partyPrivacies.enum';
import { EPartyTypes } from './enums/partyTypes.enum';

const partyDateSchemaData = {
  start: { type: Number, required: true },
  end: { type: Number, required: true },
};

const partyDateSchema = new mongoose.Schema(partyDateSchemaData, {});

const schemaData = {
  _gamingPlace: { type: mongoose.Schema.Types.ObjectId, ref: 'Game.Place' },
  _gameConsoleList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game.Console' }],
  _game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game.Videogame', required: true },
  _participantList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User.Profile' }],
  _host: { type: mongoose.Schema.Types.ObjectId, ref: 'User.Profile', required: true },
  options: {
    type: { type: String, required: true, enum: Object.values(EPartyTypes) },
    placeType: { type: String, required: true, enum: Object.values(EPartyPlaceTypes) },
    privacy: { type: String, required: true, enum: Object.values(EPartyPrivacies) },
    participantsLimit: { type: Number, min: 1, default: 100000, required: true },
    participantsLevel: { type: Number, min: 1 },
  },
  stats: {
    participantsJoined: { type: Number, default: 0, min: 0, required: true },
  },
  address: {
    country: { type: String },
    city: { type: String },
    zipCode: { type: String },
    street: { type: String },
    fullAddressString: { type: String }, // full address string for client side functionality (to display)
  },
  date: partyDateSchema,
  description: { type: String, required: true },
  isTerminated: { type: Boolean, default: false },
};

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};

export const partySchema = new mongoose.Schema(schemaData, schemaOptions);
