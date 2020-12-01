import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { QueryFilterDto } from '../../shared/dto/queryFilter.dto';
import { SkinsFindDto } from './skins.find.dto';

export class SkinsFindManyDto extends QueryFilterDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @ApiModelProperty()
    @Type(() => SkinsFindDto)
    readonly where?: SkinsFindDto | {};

    @IsOptional()
    @ApiModelProperty()
    // @ValidateNested({ each: true })
    // @Type(() => FindGamingPlaceDto)
    readonly sortBy?: { [K in keyof SkinsFindDto]: 'ASC' | 'DESC' } | {};
}
