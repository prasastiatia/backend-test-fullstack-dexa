import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminRepository } from './repositories/admin.repository';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async createStaff(createStaffDto: CreateStaffDto) {
    const admin = await this.adminRepository.createStaff(createStaffDto);
    const staffWithId = await this.adminRepository.findByIdStaff(
      admin.id_karyawan,
    );

    return staffWithId;
  }

  async updateStaff(id: number, updateStaffDto: UpdateStaffDto) {
    const existingStaff = await this.adminRepository.findByIdStaff(id);

    if (!existingStaff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }

    const updatedStaff = await this.adminRepository.updateStaff(
      id,
      updateStaffDto,
    );
    return updatedStaff;
  }

  async removeStaff(id: number): Promise<void> {
    const staff = await this.adminRepository.findByIdStaff(id);

    if (!staff) {
      throw new NotFoundException(`staff with ID ${id} not found`);
    }

    await this.adminRepository.deleteStaff(id);
  }

  async findByIdStaff(id: number) {
    const staff = await this.adminRepository.findByIdStaff(id);
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }

    return staff;
  }

  async findAllStaff() {
    const staff = await this.adminRepository.findAllStaff();
    if (!staff) {
      throw new NotFoundException(`Staff not found`);
    }

    return staff;
  }
}
