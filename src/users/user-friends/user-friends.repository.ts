import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DbEntityService } from '../../shared/services/dbEntity.service';
import { IUserFriendModel, IUserFriendModelData } from './interfaces/user-friends.interface';

@Injectable()
export class UserFriendRepository extends DbEntityService<Model<IUserFriendModel>, IUserFriendModelData, any> {
  constructor(
    @InjectModel('User.Friend')
    readonly model: Model<IUserFriendModel>,
  ) {
    super(model);
  }
}
