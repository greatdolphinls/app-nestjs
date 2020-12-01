import { NotFoundException, ForbiddenException, Injectable } from '@nestjs/common';
import { PartyJoinRequestsRepository } from './partyJoinRequests.repository';
import { IPartyJoinRequest } from './interfaces/partyJoinRequest.interface';
import { FindManyPartyJoinRequestDto } from './dto/';
import { PartiesService } from './parties.service';

@Injectable()
export class PartyJoinRequestsService {
  constructor(
    private readonly partyJoinRequestsRepository: PartyJoinRequestsRepository,
    private readonly partiesService: PartiesService,
  ) { }

  public async approveJoinRequest(joinRequestId: string, hostId: string) {
    const foundRequest = await this.partyJoinRequestsRepository.findById(joinRequestId);

    if (!foundRequest) {
      throw new NotFoundException();
    }

    if (foundRequest._host.toString() !== hostId.toString()) {
      throw new ForbiddenException();
    }

    await this.partyJoinRequestsRepository.deleteById(joinRequestId);

    return this.partiesService.addParticipant(foundRequest._party, foundRequest._user);
  }

  public async rejectJoinRequest(joinRequestId: string, hostId: string) {
    const foundRequest = await this.partyJoinRequestsRepository.findById(joinRequestId);

    if (!foundRequest) {
      throw new NotFoundException();
    }

    if (foundRequest._host.toString() !== hostId.toString()) {
      throw new ForbiddenException();
    }

    return this.partyJoinRequestsRepository.deleteById(joinRequestId);
  }

  public findForUserByParty(partyId: string, userId: string): Promise<IPartyJoinRequest> {
    return this.partyJoinRequestsRepository.findOne({ _party: partyId, _user: userId });
  }

  public async findForPartyHost(joinRequestId: string, hostId: string): Promise<IPartyJoinRequest> {
    const foundParty = await this.partyJoinRequestsRepository.findOneForHost(joinRequestId, hostId);

    if (foundParty) {
      return foundParty;
    }

    throw new NotFoundException('party join request not found');
  }

  public findMany(query: FindManyPartyJoinRequestDto): Promise<IPartyJoinRequest[]> {
    return this.partyJoinRequestsRepository.findManyForHost(query);
  }

  public countAll(query?: any): Promise<number> {
    return this.partyJoinRequestsRepository.countAll(query);
  }
}
