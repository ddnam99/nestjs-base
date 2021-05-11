import { RegisterDto } from '$models/user.dto';
import { UserService } from '$services/user.service';
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        return await this.userService.create(body)
    }
}
