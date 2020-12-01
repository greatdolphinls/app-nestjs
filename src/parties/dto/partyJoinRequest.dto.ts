import { IsMongoId, IsOptional } from 'class-validator';

export class PartyJoinRequestParamsDto {
  @IsMongoId()
  readonly partyId: string;

  @IsMongoId()
  @IsOptional()
  readonly partyJoinRequestId?: string;
}
