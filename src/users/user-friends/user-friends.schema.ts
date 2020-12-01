import * as mongoose from 'mongoose';
import { EUserFreindsStatus } from './enums/userFreindsStatus.enum';

const schemaData = {
    _userFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'User.Profile' },
    _userTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User.Profile' },
    status: { type: String, default: EUserFreindsStatus.PENDING, required: true },
};

const schemaOptions = {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
};

const userFriendSchema = new mongoose.Schema(schemaData, schemaOptions);

userFriendSchema.index({_userFrom: 1, _userTo: 1}, { unique: true});

export {
    userFriendSchema,
};
