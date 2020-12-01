import { Types } from 'mongoose';

export interface IGameModelData {
  name: string;
  coverImage: {
    original: string;
    thumbnail: string;
  };
  consoleList: string[];
}
export interface IGame extends IGameModelData {
  _id?: Types.ObjectId;
}
