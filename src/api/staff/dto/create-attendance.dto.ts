import { IsNotEmpty, IsEnum, IsDate, IsOptional } from 'class-validator';

export enum StatusAbsensi {
  MASUK = 'masuk',
  PULANG = 'pulang',
}

export class CreateAbsensiDto {
  @IsEnum(StatusAbsensi)
  status: StatusAbsensi;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  tanggal?: Date;
}
