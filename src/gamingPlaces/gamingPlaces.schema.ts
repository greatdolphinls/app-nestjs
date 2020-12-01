import * as mongoose from 'mongoose';
import { EGamingPlaceTypes } from './enums/gamingPlaceTypes.enum';

const scheduleItemSchemaData = {
  start: { type: Number, required: true },
  end: { type: Number, required: true },
};

const scheduleItemSchemaOptions = {};

const scheduleItemSchema = new mongoose.Schema(scheduleItemSchemaData, scheduleItemSchemaOptions);

const schemaData = {
  name: { type: String, index: true, unique: true, sparse: true },
  phone: { type: String },
  address: {
    country: { type: String },
    city: { type: String },
    zipCode: { type: String },
    street: { type: String },
    fullAddressString: { type: String }, // full address string for client side functionality (to display)
  },
  location: {
    type: { type: 'String', default: 'Point' }, // default value is the only for now
    coordinates: [Number], // [lon, lat]
  },
  coverImage: {
    original: { type: String },
    thumbnail: { type: String },
  },
  type: { type: String, enum: Object.values(EGamingPlaceTypes), default: EGamingPlaceTypes.PUBLIC_PLACE, required: true },
  schedule: [scheduleItemSchema],
};

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};

const gamingPlaceSchema = new mongoose.Schema(schemaData, schemaOptions);

gamingPlaceSchema.index({ location: '2dsphere' });

export { gamingPlaceSchema };
