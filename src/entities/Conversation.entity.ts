import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConversationLastMessageEntity } from './ConversationLastMessage.entity';
import { ConversationMemberEntity } from './ConversationMember.entity';

@Index('pk_conversations', ['id'], { unique: true })
@Entity('conversations')
export class ConversationEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ charset: 'utf8mb4' })
  name?: string;

  @Column({ nullable: true, type: 'longtext' })
  thumbnail?: string;

  @Column({ name: 'deleted', nullable: true, default: false })
  deleted?: boolean;

  @Column({ nullable: true })
  direct: boolean;

  @OneToMany(() => ConversationMemberEntity, member => member.conversation)
  members: ConversationMemberEntity[];

  @OneToOne(() => ConversationLastMessageEntity, lastMessage => lastMessage.conversation)
  lastMessage: ConversationLastMessageEntity;

  @CreateDateColumn({ name: 'created_date', type: 'datetime' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'modified_date', type: 'datetime' })
  modifiedDate: Date;
}
