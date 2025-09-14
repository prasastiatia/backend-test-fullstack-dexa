import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('karyawan')
export class StaffDataEntity {
  @PrimaryGeneratedColumn()
  id_karyawan: number;

  @Column({ unique: true })
  email: string;

  @Column()
  foto?: string;

  @Column()
  no_hp?: string;

  @Column()
  posisi?: string;

  @Column()
  nama?: string;

  @Column({ type: 'datetime' })
  tanggal_update: Date;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
