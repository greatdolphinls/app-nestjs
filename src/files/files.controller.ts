import { Controller, Param, Post, UsePipes, UseGuards, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiImplicitFile, ApiConsumes, ApiImplicitParam } from '@nestjs/swagger';
import { RolesGuard } from '../shared/role.guard';
import { Roles } from '../shared/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { FileParamsDto } from './dto';
import { FilesService } from './files.service';

const ENTITY = 'File';

@ApiUseTags('Files')
@Controller('files')
export class FilesController {

  constructor(private readonly filesService: FilesService) { }
  @Post('/:entityName')
  @ApiBearerAuth()
  @Roles(['USER_ADMIN'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiConsumes('multipart/form-data')
  @ApiImplicitParam({ name: 'entityName', type: String, required: true })
  @ApiImplicitFile({ name: 'file', description: 'file to upload', required: true })
  @ApiResponse({ status: 201, description: `${ENTITY} has been successfully created.` })
  @ApiResponse({ status: 400, description: 'Incoming data invalid.' })
  @UseInterceptors(FileInterceptor('file'))
  public async uploadOne(@UploadedFile() file, @Param() params: FileParamsDto): Promise<any> {
    const result = await this.filesService.uploadFile(file.buffer,
      {
        originalFileName: file.originalname,
        createThumbnail: true,
        dirName: params.entityName,
      });

    return result;
  }
}
