import { IsMongoId } from 'class-validator';

export class UserParamsDto {
  @IsMongoId()
  readonly userId: string;
}
