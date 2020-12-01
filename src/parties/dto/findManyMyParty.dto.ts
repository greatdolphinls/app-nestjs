import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Min, Max } from 'class-validator';
import { FindMyPartyDto } from './findMyParty.dto';
import { EUserRelationType } from '../enums/partyUserRelationType.enum';

export class FindManyMyPartyDto  {
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(100)
  @ApiModelProperty({ description: 'Number of items (elements) to retrieve', required: false })
  readonly limit?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(100000)
  @ApiModelProperty({ description: 'Number of items (elements) to skip', required: false })
  readonly skip?: number;

  where?: FindMyPartyDto;

  @ApiModelProperty({ required: true, enum: Object.values(EUserRelationType) })
  @IsEnum(Object.values(EUserRelationType))
  readonly relationType?: EUserRelationType;
}
