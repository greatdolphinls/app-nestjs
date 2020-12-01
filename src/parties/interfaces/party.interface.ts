import { Types } from 'mongoose';

import { EPartyPlaceTypes } from '../enums/partyPlaces.enum';
import { EPartyPrivacies } from '../enums/partyPrivacies.enum';
import { EPartyTypes } from '../enums/partyTypes.enum';

export interface IPartyModelData {
  _gamingPlace?: string;
  _gameConsoleList: string[];
  _game: string;
  _participantList?: string[];
  _host: string;
  options: {
    type: EPartyTypes;
    placeType: EPartyPlaceTypes;
    privacy: EPartyPrivacies;
    participantsLimit: number;
    participantsLevel?: number;
  };
  stats?: {
    participantsJoined?: number;
  };
  address?: {
    country: string,
    city: string,
    zipCode: string,
    street: string,
    fullAddressString: string,
  };
  date: {
    start: number,
    end: number,
  };
  description?: string;
  isTerminated?: boolean;
}
export interface IParty extends IPartyModelData {
  _id?: Types.ObjectId;
}
