import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DbEntityService } from '../shared/services/dbEntity.service';
import { IPartyJoinRequest, IPartyJoinRequestModelData } from './interfaces/partyJoinRequest.interface';

interface IPartyRequestModel extends IPartyJoinRequestModelData, Document { }

@Injectable()
export class PartyJoinRequestsRepository extends DbEntityService<Model<IPartyRequestModel>, IPartyJoinRequest, any> {
  constructor(
    @InjectModel('Party.Event.JoinRequest')
    readonly model: Model<IPartyRequestModel>,
  ) {
    super(model);
  }

  public findOneForHost(joinRequestId: string, hostId: string) {
    const searchQuery = { _id: joinRequestId, _host: hostId };
    return this.model.findOne(searchQuery).select('_user').populate([
      { path: '_user', select: 'firstName lastName nickname' },
    ]).exec();
  }

  public findManyForHost(query) {
    const whereQuery = query.where;
    const populate = [{ path: '_user', select: 'firstName lastName nickname' }];
    const select = '_user _party';

    return this.model
      .find(whereQuery)
      .select(select)
      .limit(query.limit)
      .skip(query.skip)
      .lean(true)
      .populate(populate)
      .exec();
  }
}
