import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Index("ak_users_email", ["email"], { unique: true })
@Index("pk_users", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column("text", { name: "last_name", nullable: true })
  lastName: string | null;

  @Column("text", { name: "first_name", nullable: true })
  firstName: string | null;

  @Column("text", { name: "title", nullable: true })
  title: string | null;

  @Column("text", { name: "profile_image_url", nullable: true })
  profileImageUrl: string | null;

  @Column("text", { name: "cover", nullable: true })
  coverPhoto: string | null;

  @Column("text", { name: "email", unique: true })
  email: string;

  @Column("integer", { name: "gender", nullable: true })
  gender: number | null;

  @Column("text", { name: "phone_number", nullable: true })
  phoneNumber: string | null;

  @Column("timestamp with time zone", { name: "dob", nullable: true })
  dob: Date | null;

  @Column("timestamp with time zone", {
    name: "last_login_date",
    nullable: true,
  })
  lastLoginDate: Date | null;

  @Column("text", { name: "device_ids", nullable: true, array: true })
  deviceIds: string[] | null;

  @Column("boolean", { name: "deleted" })
  deleted: boolean;

  @Column("boolean", { name: "blocked" })
  blocked: boolean;

  @Column("text", { name: "password_hash", nullable: true })
  passwordHash: string | null;

  @CreateDateColumn( { name: "created_date" })
  createdDate: Date;

  @UpdateDateColumn({ name: "modified_date" })
  modifiedDate: Date;
}
