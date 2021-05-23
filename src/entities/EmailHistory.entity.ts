import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('pk_email_histories', ['id'], { unique: true })
@Entity('email_histories')
export class EmailHistoryEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('text', { name: 'sender', nullable: true })
  sender: string | null;

  @Column('text', { name: 'receiver' })
  receiver: string;

  @Column('uuid', { name: 'receiver_id', nullable: true })
  receiverId: string | null;

  @Column('text', { name: 'title' })
  title: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('integer', { name: 'status' })
  status: number;

  @Column('integer', { name: 'type' })
  type: number;

  @CreateDateColumn({ name: 'created_date', type: 'datetime' })
  createdDate: Date;
}
