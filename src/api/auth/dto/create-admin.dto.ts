import {
  IsOptional,
  IsString,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';


export class CreateAdminDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  nama?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  email?: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  password: string;
}
