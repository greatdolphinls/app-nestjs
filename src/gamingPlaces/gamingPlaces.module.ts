import { Module } from '@nestjs/common';
import { GamingPlacesController } from './gamingPlaces.controller';
import { GamingPlacesService } from './gamingPlaces.service';
import { MongooseModule } from '@nestjs/mongoose';
import { gamingPlaceSchema } from './gamingPlaces.schema';
import { GamingPlacesRepository } from './gamingPlaces.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Game.Place', schema: gamingPlaceSchema }]),
  ],
  providers: [
    GamingPlacesService,
    GamingPlacesRepository,
  ],
  exports: [
    GamingPlacesService,
    GamingPlacesRepository,
  ],
  controllers: [
    GamingPlacesController,
  ],
})
export class GamingPlacesModule {

}
