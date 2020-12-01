import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { partySchema } from './parties.schema';
import { partyJoinRequestSchema } from './partyJoinRequests.schema';

import { GamingPlacesModule } from '../gamingPlaces/gamingPlaces.module';

import { PartiesController } from './parties.controller';
import { PartyJoinRequestsController } from './partyJoinRequests.controller';
import { PartiesRepository } from './parties.repository';
import { PartyJoinRequestsRepository } from './partyJoinRequests.repository';
import { PartiesService } from './parties.service';
import { PartyJoinRequestsService } from './partyJoinRequests.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Party.Event', schema: partySchema },
      { name: 'Party.Event.JoinRequest', schema: partyJoinRequestSchema },
    ]),
    GamingPlacesModule,
  ],
  providers: [
    PartiesService,
    PartyJoinRequestsService,
    PartiesRepository,
    PartyJoinRequestsRepository,
  ],
  exports: [
    PartiesService,
    PartiesRepository,
  ],
  controllers: [
    PartiesController,
    PartyJoinRequestsController,
  ],
})
export class PartiesModule {

}
