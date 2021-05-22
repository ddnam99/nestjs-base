import { AllowAnonymous } from '$helpers/decorator.helper';
import { TokenService } from '$services/common/token.service';
import { UserService } from '$services/common/user.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('user')
@Controller('mobile/user')
export class UserMobileController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  async profile(@Req() req: Request) {
    return req.currentUser;
  }
}
