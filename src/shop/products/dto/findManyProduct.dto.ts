import { ValidateNested, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { FindProductDto } from './findProduct.dto';

export class FindManyProductDto  {
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiModelProperty({ required: false })
  @Type(() => FindProductDto)
  readonly where?: { [K in keyof FindProductDto]: string } | {};

  @IsOptional()
  @ApiModelProperty({ required: false })
  readonly sortBy?: { [K in keyof FindProductDto]: 'ASC' | 'DESC' } | {};

  @IsOptional()
  @IsInt()
  @ApiModelProperty({ required: false })
  readonly skip?: number;

  @IsOptional()
  @IsInt()
  @ApiModelProperty({ required: false })
  readonly limit?: number;

  @IsOptional()
  readonly include?: string;

}
