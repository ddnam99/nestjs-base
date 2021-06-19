import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConversationEntity } from './Conversation.entity';
import { UserEntity } from './User.entity';

@Index('pk_conversations', ['id'], { unique: true })
@Entity('conversation_member')
export class ConversationMemberEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ charset: 'utf8mb4', nullable: true })
  nickname?: string;

  @Column({ nullable: true })
  master?: boolean;

  @Column({ name: 'last_seen', nullable: true })
  lastSeen?: Date;

  @Column({ nullable: true })
  hidden?: boolean;

  @Column({ name: 'receive_notification', nullable: true, default: true })
  receiveNotification?: boolean;

  @Column({ nullable: true })
  blocked?: boolean;

  @Column({ nullable: true, default: false })
  pined?: boolean;

  @ManyToOne(() => ConversationEntity, conversation => conversation.members)
  @JoinColumn({ name: 'conversation_id' })
  conversation: ConversationEntity;

  @Column({ name: 'conversation_id' })
  conversationId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'join_date', type: 'datetime' })
  joinDate: Date;
}
