import * as mongoose from 'mongoose';

const schemaData = {
    name: { type: String, required: true, unique: true },
    images: {
        icon: {
            original: { type: String, required: true },
            thumbnail: { type: String, required: true },
        },
        avatar: {
            original: { type: String, required: true },
            thumbnail: { type: String, required: true },
        },
    },
    toSubScribe: { type: Boolean, default: false, required: true },
};

const schemaOptions = {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
};

export const skinsSchema = new mongoose.Schema(schemaData, schemaOptions);
