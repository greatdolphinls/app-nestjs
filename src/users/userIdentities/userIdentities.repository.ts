import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { DbEntityService } from '../../shared/services/dbEntity.service';
import { IUserIdentity, IUserIdentityModelData } from './interfaces/userIdentity.interface';
import { IUserIdentityUpdate } from './interfaces/userIdentityUpdate.interface';
import { IPasswordForgotToken } from './interfaces/passwordForgotToken.interface';

interface IUserIdentityModel extends Document, IUserIdentityModelData { }

@Injectable()
export class UserIdentitiesRepository extends DbEntityService<Model<IUserIdentityModel>, IUserIdentity, IUserIdentityUpdate> {
  constructor(
    @InjectModel('User.Identity')
    readonly model: Model<IUserIdentityModel>,
  ) {
    super(model);
  }

  public findByUsername(username: string): Promise<IUserIdentityModel> {
    return this.model.findOne({ username }).exec();
  }

  public setPasswordForgotToken(username: string, passwordForgotToken: IPasswordForgotToken) {
    return this.updateOne({ username }, { 'tokens.passwordForgotToken': passwordForgotToken });
  }
}
