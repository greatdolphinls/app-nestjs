import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthsController } from '../auths/auths.controller';

import { AuthEmailService } from './authEmail.service';
import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import { EmailService } from '../shared/services/email/email.service';
import { UserIdentitiesPasswordService } from '../users/userIdentities/userIdentityPassword.service';

import { JwtStrategy } from './authJwt.strategy';

import { UserIdentitiesRepository } from '../users/userIdentities/userIdentities.repository';
import { UserProfilesRepository } from '../users/userProfiles/userProfiles.repository';

import { UserProfilesModule } from '../users/userProfiles/userProfiles.module';
import { UserIdentitiesModule } from '../users/userIdentities/userIdentities.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: {
        expiresIn: 3600,
      },
      secretOrKeyProvider: () => {
        return process.env.AUTH_JWT_SECRET;
      },
    }),
    UsersModule,
    UserProfilesModule,
    UserIdentitiesModule,
  ],
  providers: [
    AuthsService,
    UsersService,
    AuthEmailService,
    EmailService,
    JwtStrategy,
    UserIdentitiesPasswordService,
    UserIdentitiesRepository,
    UserProfilesRepository,
  ],
  exports: [
    AuthsService,
    PassportModule,
  ],
  controllers: [
    AuthsController,
  ],
})
export class AuthsModule { }
