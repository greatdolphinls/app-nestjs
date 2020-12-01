import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// import { UserWalletsController } from './userWallets.controller';
import { UserWalletsService } from './userWallets.service';
import { userWalletSchema } from './userWallets.schema';
import { UserWalletsRepository } from './userWallets.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User.Wallet', schema: userWalletSchema }]),
  ],
  providers: [
    UserWalletsService,
    UserWalletsRepository,
  ],
  exports: [
    UserWalletsService,
    UserWalletsRepository,
  ],
  controllers: [
    // UserWalletsController,
  ],
})
export class UserWalletsModule {

}
