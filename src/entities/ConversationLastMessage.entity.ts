import { MessageType } from 'aws-sdk/clients/configservice';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ConversationEntity } from './Conversation.entity';
import { UserEntity } from './User.entity';

@Entity('conversation_last_message')
export class ConversationLastMessageEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ charset: 'utf8mb4', nullable: true })
  message?: string;

  @Column({ name: 'message_type', nullable: true })
  messageType: number;

  @Column({ name: 'mime_type', nullable: true })
  mimeType?: string;

  @Column({ name: 'last_sent' })
  lastSent: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  sender: UserEntity;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => ConversationEntity, conversation => conversation.lastMessage)
  @JoinColumn({ name: 'conversation_id' })
  conversation: ConversationEntity;

  @Column({ name: 'conversation_id' })
  conversationId: string;
}
