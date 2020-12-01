import { IsMongoId } from 'class-validator';

export class PartyParamsDto {
  @IsMongoId()
  readonly partyId: string;
}
