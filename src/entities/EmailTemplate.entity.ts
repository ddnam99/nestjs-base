import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('pk_email_templates', ['id'], { unique: true })
@Entity('email_templates')
export class EmailTemplateEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('text', { name: 'subject' })
  subject: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('text', { name: 'key' })
  key: string;

  @Column('simple-array', { name: 'variables' })
  variables: string[] | null;

  @CreateDateColumn({ name: 'created_date', type: 'datetime' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'modified_date', type: 'datetime' })
  modifiedDate: Date;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;
}
