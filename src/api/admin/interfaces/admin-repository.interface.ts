import { StaffAdminEntity } from '../entities/staff.entity';
import { CreateStaffDto } from '../dto/create-staff.dto';
import { UpdateStaffDto } from '../dto/update-staff.dto';

export interface IAdminRepository {
  createStaff(CreateStaffDto: CreateStaffDto): Promise<StaffAdminEntity>;
  updateStaff(
    id: number,
    UpdateStaffDto: UpdateStaffDto,
  ): Promise<StaffAdminEntity>;
  deleteStaff(id: number): Promise<void>;
}
