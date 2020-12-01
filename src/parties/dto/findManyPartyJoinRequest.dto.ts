import { IsInt, Min, Max, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FindManyPartyJoinRequestDto {
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(100)
  @ApiModelProperty({ description: 'Number of items (elements) to retrieve', required: false })
  limit?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(100)
  @ApiModelProperty({ description: 'Number of items (elements) to retrieve', required: false })
  skip?: number;

  where?: any;
}
