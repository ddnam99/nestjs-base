import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('test')
@Controller('test')
export class TestController {
  @Get()
  getCurrentUser(@Req() req: Request) {
    return req.currentUser;
  }
}
