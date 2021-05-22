import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { OtpEntity } from './Otps.entity';
import { RoleEntity } from './Roles.entity';
import { TokenEntity } from './Token.entity';

@Index('ak_users_email', ['email'], { unique: true })
@Index('pk_users', ['id'], { unique: true })
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('text', { name: 'last_name', nullable: true })
  lastName: string | null;

  @Column('text', { name: 'first_name', nullable: true })
  firstName: string | null;

  @Column('text', { name: 'title', nullable: true })
  title: string | null;

  @Column('text', { name: 'profile_image_url', nullable: true })
  profileImageUrl: string | null;

  @Column('text', { name: 'cover', nullable: true })
  coverPhoto: string | null;

  @Column('varchar', { name: 'email', unique: true, length: 100 })
  email: string;

  @Column('integer', { name: 'gender', nullable: true })
  gender: number | null;

  @Column('text', { name: 'phone', nullable: true })
  phone: string | null;

  @Column('datetime', { name: 'dob', nullable: true })
  dob: Date | null;

  @Column('datetime', {
    name: 'last_login_date',
    nullable: true,
  })
  lastLoginDate: Date | null;

  @Column('tinyint', { name: 'deleted', default: 0 })
  deleted: boolean;

  @Column('tinyint', { name: 'blocked', default: 0 })
  blocked: boolean;

  @Column('text', { name: 'password_hash', nullable: true })
  passwordHash: string | null;

  @CreateDateColumn({ name: 'created_date', type: 'datetime' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'modified_date', type: 'datetime' })
  modifiedDate: Date;

  @OneToMany(() => TokenEntity, tokens => tokens.user)
  tokens: TokenEntity[];

  @ManyToMany(() => RoleEntity, roles => roles.users)
  roles: RoleEntity[];

  @OneToMany(() => OtpEntity, otps => otps.user)
  otps: OtpEntity[];
}
