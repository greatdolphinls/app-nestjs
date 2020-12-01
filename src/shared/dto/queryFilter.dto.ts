import { IsInt, Min, Max, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

interface IQueryFilter {
  limit?: number;
  skip?: number;
  where?: any;
  include?: string;
  sortBy?: any;
  quickSearch?: string;
}

export class QueryFilterDto implements IQueryFilter {
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

  @IsString()
  @IsOptional()
  @ApiModelProperty({ description: 'Pattern based search by allowed field', required: false })
  readonly quickSearch?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({ description: 'Fields to join/populate', required: false })
  readonly include?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({ description: 'Fields to join/populate in form of object', required: false })
  readonly includeO?: object;

  @IsOptional()
  @ApiModelProperty({ required: false })
  readonly sortBy?: any;

  @IsOptional()
  @ApiModelProperty({ required: false })
  readonly where?: any;

  @IsOptional()
  @ApiModelProperty({ required: false })
  readonly select?: string;
}
