import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserFriendsService } from './user-friends.service';
import { UserFriendsController } from './user-friends.controller';
import { userFriendSchema } from './user-friends.schema';
import { UserFriendRepository } from './user-friends.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User.Friend', schema: userFriendSchema }]),
  ],
  providers: [UserFriendsService, UserFriendRepository],
  controllers: [UserFriendsController],
  exports: [UserFriendsService],
})
export class UserFriendsModule {}
