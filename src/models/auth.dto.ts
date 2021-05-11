import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Trim } from 'utils/transformers';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ required: true })
  password: string;
}

export class CurrentUser {
  id: string;
  lastName: string;
  firstName: string;
  title?: string;
  profileImageUrl?: string;
  coverPhoto?: string;
  email: string;
  gender?: number;
  phone?: string;
  dob?: Date;
  lastLoginDate?: Date;
  deleted: boolean;
  blocked: boolean;
  @Exclude()
  passwordHash?: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(partial: Partial<CurrentUser>) {
    Object.assign(this, partial);
  }
}
