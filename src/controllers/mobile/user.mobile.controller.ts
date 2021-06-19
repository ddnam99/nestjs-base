import { AllowAnonymous, MobileController } from '$helpers/decorator.helper';
import { TokenService } from '$services/common/token.service';
import { UserService } from '$services/common/user.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@MobileController('user')
export class UserMobileController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Get('profile')
  async profile(@Req() req: Request) {
    return req.currentUser;
  }
}
