import { Types, Document } from 'mongoose';

export interface ISkinModelData {
    readonly name: string;
    readonly images: {
        head: string,
        body: string,
    };
}

export interface ISkin extends ISkinModelData {
    _id?: Types.ObjectId;
}

export interface ISkinModel extends ISkinModelData, Document {}
