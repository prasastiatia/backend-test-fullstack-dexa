import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginStaffDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}