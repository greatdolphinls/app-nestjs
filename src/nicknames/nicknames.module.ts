import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { nicknamesSchema } from './nicknames.schema';
import { NicknamesController } from './nicknames.controller';
import { NicknamesService } from './nicknames.service';
import { NicknamesRepository } from './nicknames.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Config.Nickname', schema: nicknamesSchema }]),
    ],
    controllers: [NicknamesController],
    providers: [NicknamesService, NicknamesRepository],
    exports: [NicknamesService, NicknamesRepository],
})
export class NicknamesModule {}
