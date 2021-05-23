import { Column, CreateDateColumn, Entity, Index, PrimaryColumn } from 'typeorm';

@Index('pk_verifies', ['verifyCode'], { unique: true })
@Entity('verifies', { schema: 'public' })
export class VerifyEntity {
  @PrimaryColumn('uuid', { name: 'verify_code' })
  verifyCode: string;

  @Column('uuid', { name: 'user_id', unique: true })
  userId: string;

  @Column('datetime', { name: 'expiry_date' })
  expiryDate: Date;

  @Column('boolean', { name: 'verified', default: false })
  verified: boolean;

  @CreateDateColumn({ name: 'created_date', type: 'datetime' })
  createdDate: Date;
}
