import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('ak_otps_otp', ['code'], { unique: true })
@Index('pk_otps', ['id'], { unique: true })
@Entity('otps')
export class OtpEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('uuid', { name: 'user_id', nullable: true })
  userId: string | null;

  @Column('text', { name: 'phone_received', nullable: true })
  phoneReceived: string | null;

  @Column('text', { name: 'mail_received', nullable: true })
  mailReceived: string | null;

  @Column('varchar', { name: 'otp_code', unique: true, length: 8 })
  code: string;

  @Column('datetime', { name: 'expires' })
  expires: Date;

  @Column('integer', { name: 'type' })
  type: number;

  @Column('bit', { name: 'verified', default: false })
  verified: boolean;

  @Column('text', { name: 'user_agent', nullable: true })
  userAgent: string | null;

  @Column('text', { name: 'user_ip', nullable: true })
  userIp: string | null;

  @CreateDateColumn({ name: 'created_date', type: 'datetime' })
  createdDate: Date;
}
