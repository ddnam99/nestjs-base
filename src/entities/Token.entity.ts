import {
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Index('pk_tokens', ['accessToken'], { unique: true })
@Index('ix_tokens_user_id', ['userId'], {})
@Entity('tokens')
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'access_token' })
  accessToken: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('datetime', { name: 'expires' })
  expires: Date;

  @Column('uuid', { name: 'refresh_token', unique: true })
  @Generated('uuid')
  refreshToken: string;

  @Column('datetime', { name: 'expires_refresh' })
  expiresRefresh: Date;

  @Column('text', { name: 'user_agent', nullable: true })
  userAgent: string | null;

  @ManyToOne(() => UserEntity, users => users.tokens, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity;
}
