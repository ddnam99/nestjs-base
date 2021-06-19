import { MessageType } from '$enums/chat.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConversationEntity } from './Conversation.entity';
import { UserEntity } from './User.entity';

@Entity('conversation_message')
export class ConversationMessageEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ charset: 'utf8mb4', nullable: true })
  message?: string;

  @Column({ nullable: true, comment: 'lưu chiều cao ảnh' })
  height?: number;

  @Column({ nullable: true, comment: 'lưu chiều rộng ảnh' })
  width?: number;

  @Column({ name: 'mime_type', nullable: true, comment: 'mimeType file' })
  mimeType?: string;

  @Column({ name: 'url_meta', nullable: true, type: 'longtext' })
  urlMeta?: string;

  @Column({ name: 'message_type', nullable: true, default: MessageType.MESSAGE })
  messageType?: MessageType;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  sender: UserEntity;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => ConversationEntity)
  @JoinColumn({ name: 'conversation_id' })
  conversation: ConversationEntity;

  @Column({ name: 'conversation_id' })
  conversationId: string;

  @CreateDateColumn({ name: 'created_date', type: 'datetime' })
  createdDate: Date;
}
