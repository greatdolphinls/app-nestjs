import { Types, Document } from 'mongoose';

export interface IGamingConsoleModelData {
  name: string;
  icon: {
    original: string;
    thumbnail: string;
  };
}

export interface IGamingConsole extends IGamingConsoleModelData {
  _id?: Types.ObjectId;
}

export interface IGamingConsoleModel extends IGamingConsoleModelData, Document {}
