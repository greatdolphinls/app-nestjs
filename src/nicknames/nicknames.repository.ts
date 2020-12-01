import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DbEntityService } from '../shared/services/dbEntity.service';
import { INickname, INicknameModel } from './nicknames.interface';

@Injectable()
export class NicknamesRepository extends DbEntityService < Model < INicknameModel >, INickname, any > {
    constructor(@InjectModel('Config.Nickname') private readonly nicknameModel: Model<INicknameModel>) {
        super(nicknameModel);
    }

    findByNickname(nickname: string): Promise<INickname> {
        return this.nicknameModel.findOne({ nickname }).exec();
    }
}
