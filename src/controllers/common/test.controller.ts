import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmitterConstant } from '$constants/emitter.constant';
import { AllowAnonymous, CommonController } from '$helpers/decorator.helper';

@ApiBearerAuth()
@ApiTags('test')
@CommonController('test')
@AllowAnonymous()
export class TestController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Get()
  async getCurrentUser(@Req() req: Request) {
    await this.eventEmitter.emitAsync(EmitterConstant.TEST_EVENT, { message: 'abc123' });
  }
}
