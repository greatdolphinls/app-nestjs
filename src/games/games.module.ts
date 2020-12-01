import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { MongooseModule } from '@nestjs/mongoose';
import { gameSchema } from './games.schema';
import { GamesRepository } from './games.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Game.Videogame', schema: gameSchema }]),
  ],
  providers: [
    GamesService,
    GamesRepository,
  ],
  exports: [
    GamesService,
  ],
  controllers: [
    GamesController,
  ],
})
export class GamesModule {

}
