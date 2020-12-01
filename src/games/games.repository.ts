import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DbEntityService } from '../shared/services/dbEntity.service';
import { IGame, IGameModelData } from './interfaces/game.interface';

interface IGameModel extends IGameModelData, Document { }

@Injectable()
export class GamesRepository extends DbEntityService<Model<IGameModel>, IGame, any> {
  constructor(
    @InjectModel('Game.Videogame')
    readonly model: Model<IGameModel>,
  ) {
    super(model);
  }

  public findByName(name: string, excludeId?: string): Promise<IGameModel> {
    if (excludeId) {
      return this.model.findOne({ name, _id: { $ne: excludeId } }).exec();
    }
    return this.model.findOne({ name }).exec();
  }
}
