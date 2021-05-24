import { Exclude, Expose } from 'class-transformer';

export class CurrentUserDto {
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

  constructor(partial: Partial<CurrentUserDto>) {
    Object.assign(this, partial);
  }
}
