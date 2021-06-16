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
    await this.eventEmitter.emitAsync(EmitterConstant.EMIT_TO_CLIENT, {
      userId: '14d85d07-3f0c-4b7a-9074-34fbfa6f12a1',
      event: 'test',
      payload: {
        message: 'demo',
      },
    });
  }
}
