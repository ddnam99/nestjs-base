import { Users } from '$entities/Users';
import { RegisterDto } from '$models/user.dto';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getRepository, Repository } from 'typeorm';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger("UserService")
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        private readonly connection: Connection
    ) { }

    async getById(userId: number) {
        return await this.userRepository.findOne({ id: userId })
    }

    async create(data: RegisterDto) {
        let user = await this.userRepository.findOne({ email: data.email })
        if (user) throw new BadRequestException('error.UserExist')

        user = new Users()
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.email = data.email

        user = await this.userRepository.save(user)
        return user.id
    }
}