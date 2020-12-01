import { normalize } from 'path';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { ConfigService } from '../config/config.service';
import { AwsS3Provider } from './filesUpload.provider';
import { FilesUploadService } from './filesUpload.service';
import { FilesResizeProvider } from './filesResize.provider';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  ],
  providers: [
    FilesService,
    AwsS3Provider,
    FilesUploadService,
    FilesResizeProvider,
    { provide: ConfigService, useValue: new ConfigService(normalize('.env')) },
  ],
  exports: [
    FilesService,
  ],
  controllers: [
    FilesController,
  ],
})
export class FilesModule {

}
