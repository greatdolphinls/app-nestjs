import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DbEntityService } from '../shared/services/dbEntity.service';
import { IUserWallet, IUserWalletModelData } from './interfaces';

interface IUserWalletModel extends IUserWalletModelData, Document { }

@Injectable()
export class UserWalletsRepository extends DbEntityService<Model<IUserWalletModel>, IUserWallet, any> {
  constructor(
    @InjectModel('User.Wallet')
    readonly model: Model<IUserWalletModel>,
  ) {
    super(model);
  }

  public findByUserId(userId: string): Promise<IUserWallet> {
    return this.findOne({ _user: userId });
  }
}
