import { generateToken } from '$helpers/auth.helper';
import { ChangePasswordDto, LoginDto } from '$models/auth.dto';
import { RegisterDto } from '$models/user.dto';
import { TokenService } from '$services/token.service';
import { UserService } from '$services/user.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('register')
  async register(@Req() req: Request, @Body() body: RegisterDto) {
    const userId = await this.userService.create(body);
    return await this.tokenService.create(userId, req.get('user-agent'));
  }

  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  async profile(@Req() req: Request) {
    return req.currentUser;
  }

  @Post('login')
  async login(@Req() req: Request, @Body() body: LoginDto) {
    return await this.userService.login(body.email, body.password, req.get('user-agent'));
  }

  @Post('change-password')
  async changePassword(@Req() req: Request, @Body() body: ChangePasswordDto) {
    return await this.userService.changePassword(
      req.currentUserId,
      body.oldPassword,
      body.newPassword,
    );
  }
}
