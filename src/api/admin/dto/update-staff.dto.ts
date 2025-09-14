import { IsOptional, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateStaffDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  nama?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  foto?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  posisi?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  no_hp?: string;
}
