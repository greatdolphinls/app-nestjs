import { IsOptional, IsMongoId, IsBoolean } from 'class-validator';
import { ApiModelProperty  } from '@nestjs/swagger';

export class FindPartyDto {
  @IsOptional()
  @IsMongoId()
  @ApiModelProperty({ required: false })
  readonly _gamingPlace?: string;

  @IsOptional()
  @IsBoolean()
  @ApiModelProperty({ required: false })
  readonly isTerminated?: boolean;
}
