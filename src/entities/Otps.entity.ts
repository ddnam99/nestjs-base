import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './Users.entity';

@Index('pk_otps', ['id'], { unique: true })
@Index('ix_otps_user_id', ['userId'], {})
@Entity('otps', { schema: 'public' })
export class OtpEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('text', { name: 'code', nullable: true })
  code: string | null;

  @Column('datetime', { name: 'expires' })
  expires: Date;

  @Column('integer', { name: 'type' })
  type: number;

  @ManyToOne(() => UserEntity, users => users.otps, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity;
}
