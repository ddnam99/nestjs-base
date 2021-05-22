import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmitterConstant } from '$constants/emitter.constant';

@ApiBearerAuth()
@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private eventEmitter: EventEmitter2) {}

  @Get()
  getCurrentUser(@Req() req: Request) {
    this.eventEmitter.emitAsync(EmitterConstant.TEST_EVENT, { message: 'abc123' });
  }
}
