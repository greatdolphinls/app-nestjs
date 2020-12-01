import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userProfileSchema } from './userProfiles.schema';
import { UserProfilesService } from './userProfiles.service';
import { UserProfilesController } from './userProfiles.controller';
import { DbEntityService } from '../../shared/services/dbEntity.service';
import { UserProfilesRepository } from './userProfiles.repository';
import { NicknamesModule } from '../../nicknames/nicknames.module';
import { UserFriendsModule } from '../user-friends/user-friends.module';
import { UserWalletsModule } from '../../userWallets/userWallets.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User.Profile', schema: userProfileSchema }]),
    NicknamesModule,
    UserFriendsModule,
    UserWalletsModule,
  ],
  providers: [
    UserProfilesService,
    DbEntityService,
    UserProfilesRepository,
  ],
  exports: [
    UserProfilesService,
  ],
  controllers: [
    UserProfilesController,
  ],
})
export class UserProfilesModule {

}
