import { AdminEntity } from '../entities/admin.entity';
import { StaffEntity } from '../entities/staff.entity';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { CreateStaffDto } from '../dto/create-staff.dto';

export interface IAuthRepository {
  createAdmin(CreateAdminDto: CreateAdminDto): Promise<AdminEntity>;
  createStaff(CreateStaffDto: CreateStaffDto): Promise<StaffEntity>;
}
