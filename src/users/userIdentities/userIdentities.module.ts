import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userIdentitySchema } from './userIdentities.schema';

import { UserIdentitiesRepository } from './userIdentities.repository';

import { UserIdentitiesService } from './userIdentities.service';
import { UserIdentitiesPasswordService } from './userIdentityPassword.service';
import { DbEntityService } from '../../shared/services/dbEntity.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User.Identity', schema: userIdentitySchema }]),
  ],
  providers: [
    UserIdentitiesService,
    UserIdentitiesRepository,
    UserIdentitiesPasswordService,
    DbEntityService,
  ],
  exports: [
    UserIdentitiesService,
  ],
  controllers: [

  ],
})
export class UserIdentitiesModule { }
