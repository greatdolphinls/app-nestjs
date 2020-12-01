import * as crypto from 'crypto';
import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { PartiesRepository } from './parties.repository';
import { PartyJoinRequestsRepository } from './partyJoinRequests.repository';

import { FindManyPartyDto, FindManyMyPartyDto, PartyDto } from './dto/';

import { IParty } from './interfaces/party.interface';
import { GamingPlacesService } from '../gamingPlaces/gamingPlaces.service';
import { EPartyPlaceTypes } from './enums/partyPlaces.enum';
import { EGamingPlaceTypes } from '../gamingPlaces/enums/gamingPlaceTypes.enum';
import { EUserRelationType } from './enums/partyUserRelationType.enum';
import { EPartyPrivacies } from './enums/partyPrivacies.enum';
import { IGamingPlace } from '../gamingPlaces/interfaces/gamingPlace.interface';
import { IPartyJoinRequest } from './interfaces/partyJoinRequest.interface';

@Injectable()
export class PartiesService {
  constructor(
    private readonly partiesRepository: PartiesRepository,
    private readonly partyJoinRequestsRepository: PartyJoinRequestsRepository,
    private readonly gamingPlacesService: GamingPlacesService,
  ) { }

  private createInHousePartyPlaceName(hostId: string, fullAddress: string) {
    const hash = crypto.createHash('sha256');
    hash.update(`${hostId}-${fullAddress}`);
    return `gm-${hash.digest('hex')}`;
  }

  public addParticipant(partyId: string, userId: string): Promise<IParty> {
    const querySearch = { _id: partyId, _participantList: { $ne: userId } };
    const queryUpdate = { $addToSet: { _participantList: userId }, $inc: { 'stats.participantsJoined': 1 } };

    return this.partiesRepository.update(querySearch, queryUpdate);
  }

  public deleteParticipant(partyId: string, userId: string) {
    const querySearch = { _id: partyId, _participantList: userId };
    const queryUpdate = { $pull: { _participantList: userId }, $inc: { 'stats.participantsJoined': -1 } };
    return this.partiesRepository.update(querySearch, queryUpdate);
  }

  public async createOne(data: PartyDto, hostId: string): Promise<IParty> {

    const dateStart = new Date(data.date.start);
    const dateEnd = dateStart.setHours(dateStart.getHours() + data.date.duration);
    let gamingPlace = null;

    if (data.options.placeType === EPartyPlaceTypes.IN_HOUSE) {
      const gamingPlaceName = this.createInHousePartyPlaceName(hostId, data.address.fullAddressString);
      const foundGamingPlace = await this.gamingPlacesService.findByName(gamingPlaceName);

      if (!foundGamingPlace) {
        const newGamingPlaceData: IGamingPlace = {
          name: gamingPlaceName,
          address: data.address,
          location: {
            coordinates: data.location.coordinates,
          },
          type: EGamingPlaceTypes.IN_HOUSE,
        };

        gamingPlace = await this.gamingPlacesService.createOne(newGamingPlaceData);
      } else {
        gamingPlace = foundGamingPlace;
      }

    } else {
      gamingPlace = await this.gamingPlacesService.getOne(data._gamingPlace);
      await this.gamingPlacesService.deleteOldScheduleItems(gamingPlace._id); // delete old events
    }

    if (!gamingPlace) {
      throw new BadRequestException('gaming place invalid');
    }

    const gamingPlaceId = gamingPlace._id.toString();

    const newPartyData: IParty = {
      _gamingPlace: gamingPlaceId,
      _gameConsoleList: data._gameConsoleList,
      _game: data._game,
      _host: hostId,
      date: {
        start: data.date.start,
        end: dateEnd,
      },
      options: {
        type: data.options.type,
        placeType: data.options.placeType,
        privacy: data.options.privacy,
        participantsLimit: data.options.participantsLimit,
        participantsLevel: data.options.participantsLevel || undefined,
      },
      address: gamingPlace.location.address,
      description: data.description,
    };

    const partyCreated = await this.partiesRepository.createOne(newPartyData);

    await this.gamingPlacesService.addScheduleItem(gamingPlaceId, partyCreated.date);

    return partyCreated;
  }

  public async deleteOneByUser(partyId: string, userId: string): Promise<boolean> {
    const ALLOWED_TIME_DIFF_TO_DELETE = 7200000; // (2 hours) in milliseconds. delete, otherwise terminate
    const partyFound = await this.partiesRepository.findOne({ _id: partyId, _host: userId, isTerminated: false });

    if (!partyFound) {
      throw new NotFoundException('party not found');
    }

    const diffTime = Math.abs(new Date().getTime() - partyFound.date.start);

    if (diffTime <= ALLOWED_TIME_DIFF_TO_DELETE) {
      await Promise.all([
        this.partiesRepository.findAndUpdateById(partyId, { isTerminated: true }),
        this.gamingPlacesService.deleteScheduleItem(partyFound._gamingPlace, partyFound.date._id),
      ]);
      return true;
    }

    if (partyFound.options.placeType === EGamingPlaceTypes.IN_HOUSE) {
      await this.gamingPlacesService.deleteOne(partyFound._gamingPlace);
    } else {
      await this.gamingPlacesService.deleteScheduleItem(partyFound._gamingPlace, partyFound.date._id);
    }

    const promises = [
      this.partiesRepository.deleteById(partyId),
      this.partyJoinRequestsRepository.delete({ _party: partyId }),
    ];

    await Promise.all(promises);

    return true;
  }

  public async joinParty(partyId: string, userId: string): Promise<IPartyJoinRequest | IParty> {

    const promises = [
      this.partiesRepository.findById(partyId),
      this.partyJoinRequestsRepository.findOne({ _party: partyId, _user: userId }),
    ];

    const initialSearchResult = await Promise.all(promises);

    const partyFound = initialSearchResult[0];
    const partyJoinRequest = initialSearchResult[1];

    if (!partyFound) {
      throw new NotFoundException('party not found');
    }

    if (partyFound._host.toString() === userId.toString()) {
      throw new ConflictException('can not join a party being a host');
    }

    if (partyJoinRequest) {
      throw new ConflictException('already in party');
    }

    if (partyFound.options.privacy === EPartyPrivacies.PUBLIC) {
      return this.addParticipant(partyId, userId);
    }

    const partyJoinRequestData = {
      _user: userId,
      _party: partyId,
      _host: partyFound._host,
    };

    return this.partyJoinRequestsRepository.createOne(partyJoinRequestData);
  }

  public async quitParty(partyId: string, userId: string): Promise<boolean> {
    const partyFound = await this.partiesRepository.findById(partyId);

    if (!partyFound) {
      throw new NotFoundException('party not found');
    }

    await this.partyJoinRequestsRepository.delete({ _party: partyId, _user: userId });

    return this.deleteParticipant(partyId, userId);
  }

  public findMyParties(userId: string, query: FindManyMyPartyDto) {
    const mappedQuery = { ...query };

    if (query.relationType === EUserRelationType.HOST) {
      mappedQuery.where = { _host: userId };
    } else {
      mappedQuery.where = { _participantList: userId };
    }
    return this.partiesRepository.findMany(mappedQuery);
  }

  public async findById(partyId: string): Promise<IParty> {
    const foundParty = this.partiesRepository.findOneWithFullInfo(partyId);

    if (foundParty) {
      return foundParty;
    }

    throw new NotFoundException('party not found');
  }

  public findMany(query: FindManyPartyDto): Promise<IParty[]> {
    query.select = 'options stats name date.start date.end isTerminated';
    return this.partiesRepository.findMany(query);
  }

  public countAll(): Promise<number> {
    return this.partiesRepository.countAll();
  }

}
