import { Injectable, NotFoundException } from '@nestjs/common';
import { StaffRepository } from './repositories/staff.repository';
import { CreateAbsensiDto } from './dto/create-attendance.dto';

@Injectable()
export class StaffService {
  constructor(private readonly staffRepository: StaffRepository) {}

  async createAbsensi(createAbsensiDto: CreateAbsensiDto) {
    const absensi = await this.staffRepository.createAttendance(
      createAbsensiDto,
    );

    return absensi;
  }

  async findByIdStaff(id: number) {
    const staff = await this.staffRepository.findByIdStaff(id);
    console.log('coba==', staff);
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }

    return staff;
  }

  async findByIdStaffAbsensi(id: number) {
    const staff = await this.staffRepository.findByIdStaffAbsensi(id);
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }

    return staff;
  }
}
