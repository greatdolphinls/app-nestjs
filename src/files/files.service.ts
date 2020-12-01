import { Injectable } from '@nestjs/common';
import { FilesUploadService } from './filesUpload.service';
import { FilesResizeProvider } from './filesResize.provider';
import { ConfigService } from '../config/config.service';

interface IUploadFileOptions {
  createThumbnail?: boolean;
  originalFileName: string;
  bucket?: string;
  dirName?: string;
}

interface IUploadFileDone {
  originalFileUrl: string;
  thumbnailUrl: string;
}

@Injectable()
export class FilesService {
  constructor(
    private readonly filesUploadService: FilesUploadService,
    private readonly filesResizeProvider: FilesResizeProvider,
    private readonly configService: ConfigService,
  ) { }

  public async uploadFile(file: Buffer, options: IUploadFileOptions): Promise<IUploadFileDone> {
    const output: IUploadFileDone = { originalFileUrl: '', thumbnailUrl: '' };
    const bucket = this.configService.getItem('FILE_UPLOAD_BUCKET_SHARED');
    const { dirName, originalFileName } = options;

    const originalFileUploadOptions = {
      bucket,
      dirName: dirName || '',
      originalFileName,
    };

    if (!options.createThumbnail) {
      const fileUploaded = await this.filesUploadService.uploadOne(file, originalFileUploadOptions);
      output.originalFileUrl = fileUploaded.Location;
      return output;
    }

    const result = await Promise.all([
      this.filesUploadService.uploadOne(file, originalFileUploadOptions),
      this.filesResizeProvider.resizeFromBuffer(file, 400, 400),
    ]);

    const originalFileUploaded = result[0];
    const resizedBuffer = result[1];
    const thumbnailUploaded = await this.filesUploadService.uploadOne(resizedBuffer, {
      bucket,
      originalFileName: `thumbnail_${originalFileName}`,
      dirName: dirName || '',
    });

    output.thumbnailUrl = thumbnailUploaded.Location;
    output.originalFileUrl = originalFileUploaded.Location;

    return output;
  }
}
