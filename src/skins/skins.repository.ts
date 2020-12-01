import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DbEntityService } from '../shared/services/dbEntity.service';
import { ISkinModel } from './skins.interface';
import { SkinsCreateDto, SkinsUpdateDto } from './dto';

@Injectable()
export class SkinsRepository extends DbEntityService<Model<ISkinModel>, SkinsCreateDto, SkinsUpdateDto > {
    constructor(@InjectModel('Shop.Skin') private readonly skinModel: Model<ISkinModel>) {
        super(skinModel);
    }

    public dumFunction(): any {
        // dumy function to not have error with skinModel
        return this.skinModel.findOne({});
    }
}
