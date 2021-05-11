import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('test')
@Controller('test')
export class TestController {
    @Get()
    getCurrentUser(@Req() req){
        return req.currentUser
    }
}
