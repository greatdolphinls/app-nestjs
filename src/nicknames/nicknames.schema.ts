import * as mongoose from 'mongoose';

const schemaData = {
    nickname: { type: String, required: true, unique: true },
    phone: { type: String },
};

const schemaOptions = {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
};

export const nicknamesSchema = new mongoose.Schema(schemaData, schemaOptions);
