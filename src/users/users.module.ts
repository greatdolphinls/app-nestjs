import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfilesService } from './userProfiles/userProfiles.service';
import { UserIdentitiesService } from './userIdentities/userIdentities.service';
import { UserIdentitiesPasswordService } from './userIdentities/userIdentityPassword.service';
import { UsersEmailService } from './usersEmail.service';
import { EmailService } from '../shared/services/email/email.service';
import { UsersController } from './users.controller';
import { UserProfilesRepository } from './userProfiles/userProfiles.repository';
import { UserIdentitiesRepository } from './userIdentities/userIdentities.repository';
import { UserProfilesModule } from './userProfiles/userProfiles.module';
import { UserIdentitiesModule } from './userIdentities/userIdentities.module';
import { UserFriendsModule } from './user-friends/user-friends.module';

@Module({
  imports: [
    UserProfilesModule,
    UserIdentitiesModule,
    UserFriendsModule,
  ],
  providers: [
    UsersService,
    UserProfilesRepository,
    UserIdentitiesRepository,
    UserProfilesService,
    UserIdentitiesService,
    UserIdentitiesPasswordService,
    UsersEmailService,
    EmailService,
  ],
  exports: [
    UsersService,
  ],
  controllers: [
    UsersController,
  ],
})
export class UsersModule {

}
