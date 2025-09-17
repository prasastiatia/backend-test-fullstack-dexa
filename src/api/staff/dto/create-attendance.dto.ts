import { IsNotEmpty, IsEnum, IsDate, IsOptional, IsInt } from 'class-validator';

export enum StatusAbsensi {
  MASUK = 'masuk',
  PULANG = 'pulang',
}

export class CreateAbsensiDto {
  @IsEnum(StatusAbsensi)
  status: StatusAbsensi;

  @IsOptional()
  @IsDate()
  tanggal?: Date;

  @IsOptional()
  @IsInt()
  id_karyawan?: number;
}
