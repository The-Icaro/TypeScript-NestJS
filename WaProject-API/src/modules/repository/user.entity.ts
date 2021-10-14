import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserTypePermission } from "./user-type.enum";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string & { __brand: "userId" };

  @Column("varchar", {length: 15})
  firstName: string;

  @Column("varchar", {length: 15})
  secondName: string;

  @Column("varchar", {unique: true, length: 30},)
  email: string;

  @Column("varchar", {length: 200})
  password: string;

  @Column({
    type: "enum",
    enum: UserTypePermission,
  })
  type: UserTypePermission;

  // Metadata

  @Column("varchar", {length: 100})
  salt: string;

  @Column({ type: 'date' })
  created_at: string;

  @Column({ type: 'date' })
  updated_at: string;

  @Column({ default: 1})
  version: number

  async validatePassword(password : string) : Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }

}