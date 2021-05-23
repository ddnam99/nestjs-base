import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('pk_configurations', ['id'], { unique: true })
@Entity('configurations')
export class ConfigurationEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('text', { name: 'config_name', nullable: true })
  configName: string | null;

  @Column('text', { name: 'config_value', nullable: true })
  configValue: string | null;

  @Column('integer', { name: 'type' })
  type: number;

  @Column('integer', { name: 'order_number' })
  orderNumber: number;

  @CreateDateColumn({ name: 'created_date', type: 'datetime' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'modified_date', type: 'datetime' })
  modifiedDate: Date;
}
