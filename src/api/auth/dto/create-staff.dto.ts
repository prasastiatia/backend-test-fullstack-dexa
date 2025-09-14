import {
  IsOptional,
  IsString,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';


export class CreateStaffDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  nama?: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  email: string;
  
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

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  password: string;
}
