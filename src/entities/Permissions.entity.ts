import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './Roles.entity';

@Index('pk_permissions', ['id'], { unique: true })
@Entity('permissions', { schema: 'public' })
export class PermissionEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('integer', { name: 'level' })
  level: number;

  @Column('uuid', { name: 'parent_permission_id', nullable: true })
  parentPermissionId: string | null;

  @Column('uuid', { name: 'merchant_id' })
  merchantId: string;

  @CreateDateColumn({ name: 'created_date', type: 'datetime' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'modified_date', type: 'datetime' })
  modifiedDate: Date;

  @ManyToMany(() => RoleEntity, roles => roles.permissions)
  @JoinTable({
    name: 'role_permissions',
    joinColumns: [{ name: 'permission_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'role_id', referencedColumnName: 'id' }],
    schema: 'public',
  })
  roles: RoleEntity[];
}
