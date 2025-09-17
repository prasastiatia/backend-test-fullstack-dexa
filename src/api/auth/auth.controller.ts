import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginStaffDto } from './dto/login-staff.dto';
import { ResponseSuccessDto } from 'src/common/dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/admin/register')
  async registerAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.createAdmin(createAdminDto);
  }

  @Post('/staff/register')
  async registerStaff(@Body() createStaffDto: CreateStaffDto) {
    return this.authService.createStaff(createStaffDto);
  }

  @Post('/admin/login')
  async loginAdmin(@Body() loginAdminDto: LoginAdminDto) {
    const user = await this.authService.validateAdminLogin(
      loginAdminDto.username,
      loginAdminDto.password,
    );
    return this.authService.login(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/staff/login')
  async loginUser(@Body() loginUserDto: LoginStaffDto) {
    const user = await this.authService.validateUserLogin(
      loginUserDto.email,
      loginUserDto.password,
    );
    const responseAccessToken = await this.authService.loginStaff(user);

    delete user.password;

    const response = {
      ...responseAccessToken,
      user: user,
    };

    return new ResponseSuccessDto('success', response);
  }
}
