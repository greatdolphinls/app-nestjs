import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DbEntityService } from '../shared/services/dbEntity.service';
import { IGamingConsole, IGamingConsoleModel } from './interfaces/gamingConsole.interface';

@Injectable()
export class GamingConsolesRepository extends DbEntityService<Model<IGamingConsoleModel>, IGamingConsole, any> {
  constructor(
    @InjectModel('Game.Console')
    readonly model: Model<IGamingConsoleModel>,
  ) {
    super(model);
  }

  public findByName(name: string, excludeId?: string): Promise<IGamingConsoleModel> {
    if (excludeId) {
      return this.model.findOne({ name, _id: { $ne: excludeId } }).exec();
    }
    return this.model.findOne({ name }).exec();
  }
}
