import { Injectable } from '@nestjs/common';
import { AwsS3Provider } from './filesUpload.provider';

interface IUploadOneOptions {
  bucket: string;
  dirName?: string;
  originalFileName: string;
}

@Injectable()
export class FilesUploadService {
  constructor(private readonly fileUploadProvider: AwsS3Provider) { }

  public uploadOne(file: Buffer, options: IUploadOneOptions) {
    const dirName = options.dirName || '';

    return this.fileUploadProvider.uploadFileFromBuffer({
      file,
      bucket: options.bucket,
      destinationFilePath: `${dirName}/${Date.now().toString()}-${options.originalFileName}`,
      ACL: 'public-read',
    });
  }
}
