import { IsEnum, IsNumber, Min, ValidateIf } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

import { EPartyPlaceTypes } from '../enums/partyPlaces.enum';
import { EPartyPrivacies } from '../enums/partyPrivacies.enum';
import { EPartyTypes } from '../enums/partyTypes.enum';

export class PartyOptionsDto {
  @ApiModelProperty()
  @IsEnum(Object.values(EPartyTypes))
  readonly type: EPartyTypes;

  @ApiModelProperty()
  @IsEnum(Object.values(EPartyPlaceTypes))
  readonly placeType: EPartyPlaceTypes;

  @ApiModelProperty()
  @IsEnum(Object.values(EPartyPrivacies))
  readonly privacy: EPartyPrivacies;

  @ApiModelProperty()
  @IsNumber()
  @Min(1)
  readonly participantsLimit: number;

  @ApiModelProperty({ required: false })
  @IsNumber()
  @Min(1)
  @ValidateIf(obj => obj.type === EPartyTypes.E_SPORT)
  readonly participantsLevel?: number;
}
