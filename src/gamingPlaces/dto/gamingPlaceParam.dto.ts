import { IsString, IsMongoId } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GamingPlaceParamDto {
    @IsString()
    @IsMongoId()
    @ApiModelProperty()
    readonly gamingPlaceId: string;
}
