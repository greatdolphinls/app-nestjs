import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { QueryFilterDto } from '../../shared/dto/queryFilter.dto';
import { NicknamesFindDto } from './nicknames.find.dto';

export class NicknamesFindManyDto extends QueryFilterDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @ApiModelProperty()
    @Type(() => NicknamesFindDto)
    readonly where?: NicknamesFindDto | {};

    @IsOptional()
    @ApiModelProperty()
    // @ValidateNested({ each: true })
    // @Type(() => FindGamingPlaceDto)
    readonly sortBy?: { [K in keyof NicknamesFindDto]: 'ASC' | 'DESC' } | {};
}
