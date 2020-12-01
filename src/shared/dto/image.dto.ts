import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ImageDto {
    @IsString()
    @ApiModelProperty()
    readonly original: string;

    @IsString()
    @ApiModelProperty()
    readonly thumbnail: string;
}
