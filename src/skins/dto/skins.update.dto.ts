import { IsString, IsOptional, ValidateNested, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SkinsImagesDto } from './skins.images.dto';

export class SkinsUpdateDto {
    @IsOptional()
    @IsString()
    @ApiModelProperty()
    readonly name: string;

    @IsOptional()
    @ValidateNested()
    @ApiModelProperty()
    @Type(() => SkinsImagesDto)
    readonly images: SkinsImagesDto;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    readonly toSubScribe: boolean;
}
