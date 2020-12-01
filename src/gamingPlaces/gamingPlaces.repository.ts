import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DbEntityService } from '../shared/services/dbEntity.service';
import { IGamingPlace, IGamingPlaceModelData } from './interfaces/gamingPlace.interface';

interface IGamingPlaceModel extends IGamingPlaceModelData, Document { }

@Injectable()
export class GamingPlacesRepository extends DbEntityService<Model<IGamingPlaceModel>, IGamingPlace, any> {
  constructor(
    @InjectModel('Game.Place')
    readonly model: Model<IGamingPlaceModel>,
  ) {
    super(model);
  }

  public findByName(name: string): Promise<IGamingPlaceModel> {
    return this.model.findOne({ name }).exec();
  }
}
