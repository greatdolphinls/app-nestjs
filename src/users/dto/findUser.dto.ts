import { IsString, Length, IsEmail, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FindUserDto {

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  _id?: string | object;

  @IsString()
  @IsOptional()
  @IsEmail()
  @ApiModelProperty()
  readonly email?: string;

  @IsString()
  @IsOptional()
  @Length(1, 200)
  @ApiModelProperty()
  readonly firstName?: string;

  @IsString()
  @IsOptional()
  @Length(1, 200)
  @ApiModelProperty()
  readonly lastName?: string;
}
