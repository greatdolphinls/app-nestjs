import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { SkinsImagesDto } from './skins.images.dto';
import { Type } from 'class-transformer';

export class SkinsFindDto {
    @IsOptional()
    @IsString()
    @ApiModelProperty()
    readonly name?: string;

    @IsOptional()
    @ValidateNested()
    @ApiModelProperty()
    @Type(() => SkinsImagesDto)
    readonly images?: SkinsImagesDto;
}
