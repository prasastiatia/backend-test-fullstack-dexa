import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { StaffEntity } from '../entities/staff.entity';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { CreateStaffDto } from '../dto/create-staff.dto';
import { IAuthRepository } from '../interfaces/auth-repository.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly AdminRepository: Repository<AdminEntity>,

    @InjectRepository(StaffEntity)
    private readonly StaffRepository: Repository<StaffEntity>,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    const admin = this.AdminRepository.create(createAdminDto);
    return this.AdminRepository.save(admin);
  }

  async createStaff(createStaffDto: CreateStaffDto): Promise<StaffEntity> {
    const staff = this.StaffRepository.create(createStaffDto);
    return this.StaffRepository.save(staff);
  }

  async findByIdAdmin(id: number): Promise<AdminEntity | null> {
    return this.AdminRepository.findOne({
      where: { id_admin: id },
    });
  }

  async findByIdStaff(id: number): Promise<StaffEntity | null> {
    return this.StaffRepository.findOne({
      where: { id_karyawan: id },
    });
  }

  async findByUsername(username: string): Promise<AdminEntity | undefined> {
    return this.AdminRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<StaffEntity | undefined> {
    return this.StaffRepository.findOne({ where: { email } });
  }
}
