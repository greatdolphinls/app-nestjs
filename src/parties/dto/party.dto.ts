import { ValidateNested, IsMongoId, ArrayUnique, IsNotEmpty, IsAscii, Length, ValidateIf } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { PartyAddressDto } from './partyAddress.dto';
import { PartyLocationDto } from './partyLocation.dto';
import { PartyOptionsDto } from './partyOptions.dto';
import { PartyDateDto } from './partyDate.dto';

import { EPartyPlaceTypes } from '../enums/partyPlaces.enum';

export class PartyDto {
  @ApiModelProperty({ required: false })
  @IsMongoId()
  @ValidateIf(obj => obj.options.placeType === EPartyPlaceTypes.GAMING_PLACE)
  readonly _gamingPlace: string;

  @ApiModelProperty()
  @IsMongoId({ each: true })
  @ArrayUnique()
  readonly _gameConsoleList: string[];

  @ApiModelProperty()
  @IsMongoId()
  readonly _game: string;

  @ApiModelProperty()
  @ValidateNested({ each: true })
  @Type(() => PartyOptionsDto)
  readonly options: PartyOptionsDto;

  @ApiModelProperty({ required: false })
  @IsNotEmpty()
  @ValidateIf(obj => obj.options.placeType === EPartyPlaceTypes.IN_HOUSE)
  @ValidateNested({ each: true })
  @Type(() => PartyAddressDto)
  readonly address?: PartyAddressDto;

  @ApiModelProperty({ required: false })
  @IsNotEmpty()
  @ValidateIf(obj => obj.options.placeType === EPartyPlaceTypes.IN_HOUSE)
  @ValidateNested({ each: true })
  @Type(() => PartyLocationDto)
  readonly location?: PartyLocationDto;

  @ApiModelProperty()
  @ValidateNested({ each: true })
  @Type(() => PartyDateDto)
  readonly date: PartyDateDto;

  @ApiModelProperty()
  @IsAscii()
  @Length(0, 2500)
  readonly description: string;
}
