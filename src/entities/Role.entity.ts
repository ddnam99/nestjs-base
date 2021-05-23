import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PermissionEntity } from './Permission.entity';
import { UserEntity } from './User.entity';

@Index('pk_roles', ['id'], { unique: true })
@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('boolean', { name: 'default' })
  default: boolean;

  @Column('boolean', { name: 'static' })
  static: boolean;

  @CreateDateColumn({ name: 'created_date', type: 'datetime' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'modified_date', type: 'datetime' })
  modifiedDate: Date;

  @ManyToMany(() => PermissionEntity, permissions => permissions.roles)
  permissions: PermissionEntity[];

  @ManyToMany(() => UserEntity, users => users.roles)
  @JoinTable({
    name: 'user_roles',
    joinColumns: [{ name: 'role_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'user_id', referencedColumnName: 'id' }],
    schema: 'public',
  })
  users: UserEntity[];
}
