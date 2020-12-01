import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { gamingConsoleSchema } from './gamingConsoles.schema';
import { GamingConsolesController } from './gamingConsoles.controller';
import { GamingConsoleService } from './gamingConsoles.service';
import { GamingConsolesRepository } from './gamingConsoles.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Game.Console', schema: gamingConsoleSchema }]),
  ],
  providers: [
    GamingConsoleService,
    GamingConsolesRepository,
  ],
  exports: [
    GamingConsoleService,
  ],
  controllers: [
    GamingConsolesController,
  ],
})
export class GamingConsolesModule {

}
