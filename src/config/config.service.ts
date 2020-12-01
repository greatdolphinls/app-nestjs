import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = {};
    dotenv.config({ path: filePath });
    this.envConfig.DB_HOST = process.env.DB_HOST;
    this.envConfig.DB_NAME = process.env.DB_NAME;
    this.envConfig.DB_PORT = process.env.DB_PORT;
    this.envConfig.FILE_UPLOAD_BUCKET_SHARED = process.env.FILE_UPLOAD_BUCKET_SHARED;
  }

  getItem(key: string): string {
    return this.envConfig[key];
  }
}
