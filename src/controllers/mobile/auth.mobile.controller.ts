import { AllowAnonymous, MobileController } from '$helpers/decorator.helper';
import { ChangePasswordDto } from '$models/auth/ChangePassword.dto';
import { LoginDto } from '$models/auth/Login.dto';
import { RefreshTokenDto } from '$models/auth/RefreshToken.dto';
import { RegisterDto } from '$models/auth/Register.dto';
import { TokenService } from '$services/common/token.service';
import { UserService } from '$services/common/user.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
@MobileController('auth')
export class AuthMobileController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('register')
  @AllowAnonymous()
  async register(@Req() req: Request, @Body() body: RegisterDto) {
    const userId = await this.userService.create(body);
    return await this.tokenService.create(userId, req.get('user-agent'));
  }

  @Post('login')
  @AllowAnonymous()
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

  @Post('refresh-token')
  async refreshToken(@Req() req: Request, @Body() body: RefreshTokenDto) {
    return await this.tokenService.refreshToken(
      req.currentUserId,
      req.accessToken,
      body.refreashToken,
      req.get('user-agent'),
    );
  }
}
