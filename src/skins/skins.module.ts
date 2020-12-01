import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { skinsSchema } from './skins.schema';
import { SkinsController } from './skins.controller';
import { SkinsService } from './skins.service';
import { SkinsRepository } from './skins.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Shop.Skin', schema: skinsSchema }]),
  ],
  controllers: [SkinsController],
  providers: [SkinsService, SkinsRepository],
})
export class SkinsModule {}
