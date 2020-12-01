import { IsString, IsDateString, Length, IsEmail, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  @ApiModelProperty()
  readonly firstName: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  @ApiModelProperty()
  readonly lastName: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  @ApiModelProperty()
  readonly nickname: string;

  @IsOptional()
  @IsDateString()
  @ApiModelProperty()
  readonly dateOfBirth: string;

}
