import { EUploadEntities } from '../enum/files.enum';
import { IsString, IsIn } from 'class-validator';

export class FileParamsDto {
  @IsString()
  @IsIn(Object.values(EUploadEntities))
  readonly entityName: EUploadEntities;
}
