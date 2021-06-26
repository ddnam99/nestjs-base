import { BadRequestException, Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmitterConstant } from '$constants/emitter.constant';
import { AllowAnonymous, CommonController } from '$helpers/decorator.helper';
import { EmitterService } from '$services/common/emitter.service';

@CommonController('test')
export class TestController {
  constructor(private readonly emitterService: EmitterService) {}

  @Get()
  async test(@Req() req: Request) {
    throw new BadRequestException('avx');
  }
}
