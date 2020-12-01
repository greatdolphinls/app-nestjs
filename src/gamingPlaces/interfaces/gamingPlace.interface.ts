import { Types } from 'mongoose';
import { EGamingPlaceTypes } from '../enums/gamingPlaceTypes.enum';

export interface IGamingPlaceScheduleItem {
  start: number;
  end: number;
}

export interface IGamingPlaceModelData {
  name?: string;
  address: {
    zipCode: string;
    country: string;
    city: string;
    street: string;
    fullAddressString: string;
  };
  location: {
    coordinates: number[];
  };
  coverImage?: {
    original: string;
    thumbnail: string;
  };
  phone?: string;
  type?: EGamingPlaceTypes;
  schedule?: IGamingPlaceScheduleItem[];
}

export interface IGamingPlace extends IGamingPlaceModelData {
  _id?: Types.ObjectId;
}
