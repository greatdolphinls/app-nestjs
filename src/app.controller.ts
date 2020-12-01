import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@ApiUseTags('Root')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get()
  @ApiResponse({ status: 200, description: 'OK' })
  getHello(): string {
    return this.appService.getStatus();
  }

  @Get('status/healthcheck')
  @ApiResponse({ status: 200, description: 'OK' })
  getStatusHealthcheck(): string {
    return this.appService.getStatus();
  }
}
