import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { normalize } from 'path';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(normalize('.env')),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule { }
