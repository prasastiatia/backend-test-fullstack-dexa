import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id_admin: number;

  @Column({ unique: true })
  email?: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  nama?: string;

  @Column()
  role?: string;

  @Column({ type: 'datetime' })
  created_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
