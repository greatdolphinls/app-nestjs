import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { GamingPlacesRepository } from './gamingPlaces.repository';
import { GamingPlaceDto, FindManyGamingPlaceDto } from './dto';
import { IGamingPlace, IGamingPlaceScheduleItem } from './interfaces/gamingPlace.interface';

@Injectable()
export class GamingPlacesService {
  constructor(private readonly gamingPlacesRepository: GamingPlacesRepository) { }

  public async createOne(gamingPlaceData: GamingPlaceDto): Promise<IGamingPlace> {

    if (!gamingPlaceData.name) {
      return this.gamingPlacesRepository.createOne(gamingPlaceData);
    }

    const gameFound = await this.gamingPlacesRepository.findByName(gamingPlaceData.name);
    if (!gameFound) {
      return this.gamingPlacesRepository.createOne(gamingPlaceData);
    }
    throw new ConflictException('gaming place exists');
  }

  public async getOne(gamingPlaceId: string): Promise<IGamingPlace> {
    const gamingPlaceFound = await this.gamingPlacesRepository.findById(gamingPlaceId);
    if (gamingPlaceFound) {
      return gamingPlaceFound;
    }
    throw new NotFoundException('gaming place not found');
  }

  public getMany(query: FindManyGamingPlaceDto): Promise<IGamingPlace[]> {
    return this.gamingPlacesRepository.findMany(query);
  }

  public getManyInLocation(query: FindManyGamingPlaceDto): Promise<IGamingPlace[]> {
    const RADIUS_LIM = 200000; // meters
    const queryMapped: any = { ...query };
    const searchRadius = (queryMapped.where.location.radius <= RADIUS_LIM) ?
      queryMapped.where.location.radius : RADIUS_LIM;

    queryMapped.where.location = {
      $near: {
        $maxDistance: searchRadius,
        $geometry: {
          type: 'Point',
          coordinates: [query.where.location.lon, query.where.location.lat],
        },
      },
    };

    return this.gamingPlacesRepository.findMany(queryMapped);
  }
  /**
   * Quick search for gaming places. By name fields only. (searches by pattern - RegExp)
   * @param param0
   */
  public findByPattern({ ...query }: FindManyGamingPlaceDto) {
    return this.gamingPlacesRepository.findByPattern('name', query);
  }

  public findByName(name: string): Promise<IGamingPlace> {
    return this.gamingPlacesRepository.findOne({ name });
  }

  public async deleteOne(gamingPlaceId: string): Promise<boolean> {
    const gamingPlaceFound = await this.gamingPlacesRepository.findById(gamingPlaceId);

    if (gamingPlaceFound) {
      return this.gamingPlacesRepository.deleteById(gamingPlaceId);
    }
    throw new NotFoundException('gaming place not found');
  }

  public async updateOne(gamingPlaceId: string, updateData: GamingPlaceDto): Promise<IGamingPlace> {
    const gamingPlaceFound = await this.gamingPlacesRepository.findById(gamingPlaceId);

    if (gamingPlaceFound) {
      /**
       * MongoDB GeoJson contains type inside the location object
       * If we don't provide the type, it will throw an error, we don't want to provide it
       * Converting an object to dot notation from JSON helps to avoid an error
       */
      if (updateData.location) {
        const tmpLocationStorage = updateData.location;
        delete updateData.location;
        updateData['location.coordinates'] = tmpLocationStorage.coordinates;
      }
      return this.gamingPlacesRepository.findAndUpdateById(gamingPlaceId, updateData);
    }
    throw new NotFoundException('gaming place not found');
  }

  public addScheduleItem(gamingPlaceId: string, scheduleData: IGamingPlaceScheduleItem): Promise<IGamingPlace> {
    return this.gamingPlacesRepository.update({ _id: gamingPlaceId }, { $addToSet: { schedule: scheduleData } });
  }

  public deleteScheduleItem(gamingPlaceId: string, scheduleItemId: string): Promise<IGamingPlace> {
    return this.gamingPlacesRepository.update({ _id: gamingPlaceId }, { $pull: { schedule: { _id: scheduleItemId } } });
  }

  public deleteOldScheduleItems(gamingPlaceId: string) {
    const currentDate = new Date().getTime();
    return this.gamingPlacesRepository.update(
      { _id: gamingPlaceId, schedule: { $not: { $size: 0 } } },
      { $pull: { schedule: { end: { $lte: currentDate } } } },
    );
  }

  public countAll(): Promise<number> {
    return this.gamingPlacesRepository.countAll();
  }
}
