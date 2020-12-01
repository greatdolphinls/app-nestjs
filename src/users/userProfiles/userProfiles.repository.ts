import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DbEntityService } from '../../shared/services/dbEntity.service';
import { IUserProfile, IUserProfileModelData } from './interfaces/userProfile.interface';

interface IUserProfileModel extends IUserProfileModelData, Document { }

@Injectable()
export class UserProfilesRepository extends DbEntityService<Model<IUserProfileModel>, IUserProfile, any> {
  constructor(
    @InjectModel('User.Profile')
    readonly model: Model<IUserProfileModel>,
  ) {
    super(model);
  }

  public findByEmail(email: string): Promise<IUserProfileModel> {
    return this.model.findOne({ email }).exec();
  }

  public findByNickname(nickname: string): Promise<IUserProfileModel> {
    return this.model.findOne({ nickname }).exec();
  }
}
