import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { AdminEntity } from './entities/admin.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createJwtToken(payload: any) {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    const admin = await this.authRepository.createAdmin(createAdminDto);
    const adminWithId = await this.authRepository.findByIdAdmin(admin.id_admin);

    return adminWithId;
  }

  async createStaff(createStaffDto: CreateStaffDto) {
    const admin = await this.authRepository.createStaff(createStaffDto);
    const staffWithId = await this.authRepository.findByIdStaff(
      admin.id_karyawan,
    );

    return staffWithId;
  }

  async validateAdminLogin(username: string, pass: string) {
    const admin = await this.authRepository.findByUsername(username);
    if (admin && (await admin.validatePassword(pass))) {
      return admin;
    }
    throw new UnauthorizedException('Invalid credentials or not admin');
  }

  async validateUserLogin(email: string, pass: string) {
    const staff = await this.authRepository.findByEmail(email);
    if (staff && (await staff.validatePassword(pass))) {
      return staff;
    }
    throw new UnauthorizedException('Invalid credentials or not user');
  }

  async login(user: any) {
    const payload = {
      id: user.id_admin,
      username: user.username,
      email: user.email,
    };
    return this.createJwtToken(payload);
  }

  async loginStaff(user: any) {
    const payload = {
      id: user.id_karyawan,
      username: user.username,
      email: user.email,
    };
    return this.createJwtToken(payload);
  }
}
