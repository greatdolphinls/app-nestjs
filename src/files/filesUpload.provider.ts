import { S3 } from 'aws-sdk';

interface IAwsS3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

interface IAwsFileUpload {
  file: Buffer;
  bucket: string;
  destinationFilePath: string;
  ACL: string | 'public-read';
}

export class AwsS3Provider {
  private uploader: S3;
  constructor(config: IAwsS3Config) {
    this.uploader = new S3(config);
  }

  public async uploadFileFromBuffer(fileUploadOptions: IAwsFileUpload) {

    const params = {
      Body: fileUploadOptions.file,
      Bucket: fileUploadOptions.bucket,
      Key: fileUploadOptions.destinationFilePath,
      ACL: fileUploadOptions.ACL,
    };

    return this.uploader.upload(params).promise();

  }
}
