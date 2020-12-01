import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class FilesResizeProvider {
  private resizer: sharp;
  constructor() {
    this.resizer = sharp;
  }

  public async resizeFromBuffer(file: Buffer, height: number, width: number): Promise<Buffer> {
    return this.resizer(file, { height, width }).toBuffer();
  }
}
