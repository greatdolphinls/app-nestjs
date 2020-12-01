import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class PartyAddressDto {
  @IsString()
  @ApiModelProperty()
  readonly country: string;

  @IsString()
  @ApiModelProperty()
  readonly city: string;

  @IsString()
  @ApiModelProperty()
  readonly zipCode: string;

  @IsString()
  @ApiModelProperty()
  readonly street: string;

  @IsString()
  @ApiModelProperty()
  readonly fullAddressString: string;
}
