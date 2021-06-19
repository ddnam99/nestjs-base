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

  @Column({ nullable: true })
  height?: number;

  @Column({ nullable: true })
  width?: number;

  @Column({ name: 'mime_type', nullable: true })
  mimeType?: string;

  @Column({ name: 'url_meta', nullable: true, type: 'longtext' })
  urlMeta?: string;

  @Column({ name: 'share_meta', nullable: true, type: 'longtext' })
  shareMeta?: string;

  @Column({ name: 'share_type', nullable: true })
  shareType?: string;

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
