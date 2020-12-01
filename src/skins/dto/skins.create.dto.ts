import { IsString, ValidateNested, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { SkinsImagesDto } from './skins.images.dto';
import { Type } from 'class-transformer';

export class SkinsCreateDto {
    @IsString()
    @ApiModelProperty()
    readonly name: string;

    @ValidateNested()
    @ApiModelProperty()
    @Type(() => SkinsImagesDto)
    readonly images: SkinsImagesDto;

    @IsBoolean()
    @ApiModelProperty()
    readonly toSubScribe: boolean;
}
