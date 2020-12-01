import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class OrderCreateDto {
    @ApiModelProperty()
    @IsString()
    readonly _product: string;
}
