import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DbEntityService } from '../shared/services/dbEntity.service';
import { IParty, IPartyModelData } from './interfaces/party.interface';

interface IPartyModel extends IPartyModelData, Document { }

@Injectable()
export class PartiesRepository extends DbEntityService<Model<IPartyModel>, IParty, any> {
  constructor(
    @InjectModel('Party.Event')
    readonly model: Model<IPartyModel>,
  ) {
    super(model);
  }

  public findOneWithFullInfo(partyId): Promise<IParty> {
    return this.model
      .findOne({ _id: partyId })
      .select('options description stats name _gameConsoleList _participantList _game _host date.start date.end isTerminated')
      .populate([
        { path: '_gameConsoleList', select: 'name' },
        { path: '_participantList', select: 'email firstName lastName nickname' },
        { path: '_game', select: 'name coverImage' },
        { path: '_host', select: 'email firstName lastName nickname' },
      ])
      .exec();
  }
}
