import { ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ImageDto } from '../../shared/dto/image.dto';
import { Type } from 'class-transformer';

export class SkinsImagesDto {
    @ValidateNested()
    @ApiModelProperty()
    @Type(() => ImageDto)
    readonly icon: ImageDto;

    @ValidateNested()
    @ApiModelProperty()
    @Type(() => ImageDto)
    readonly avatar: ImageDto;
}
