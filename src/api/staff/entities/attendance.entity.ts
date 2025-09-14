import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity('absensi')
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id_absensi: number;

  @Column()
  id_karyawan: number;

  @Column()
  tanggal: Date;

  @Column({
    type: 'enum',
    enum: ['pulang', 'masuk'],
  })
  status: 'pulang' | 'masuk';
}
