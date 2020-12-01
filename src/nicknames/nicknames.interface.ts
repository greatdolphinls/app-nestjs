import { Types, Document } from 'mongoose';

export interface INicknameModelData {
    readonly nickname: string;
    readonly phone?: string;
}

export interface INickname extends INicknameModelData {
    _id?: Types.ObjectId;
}

export interface INicknameModel extends INicknameModelData, Document {}
