import { Module } from '@nestjs/common';

import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';

@Module({
  imports: [
  ],
  providers: [
    ChatsService,
  ],
  exports: [
  ],
  controllers: [
    ChatsController,
  ],
})
export class ChatsModule {

}
