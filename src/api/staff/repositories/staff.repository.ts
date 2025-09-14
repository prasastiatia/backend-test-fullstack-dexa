import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffDataEntity } from '../entities/staff.entity';
import { AttendanceEntity } from '../entities/attendance.entity';
import { CreateAbsensiDto } from '../dto/create-attendance.dto';

import { IStaffRepository } from '../interfaces/staff-repository.interface';

@Injectable()
export class StaffRepository implements IStaffRepository {
  constructor(
    @InjectRepository(StaffDataEntity)
    private readonly StaffDataRepository: Repository<StaffDataEntity>,

    @InjectRepository(AttendanceEntity)
    private readonly AttendanceRepository: Repository<AttendanceEntity>,
  ) {}

  async createAttendance(
    createAbsensiDto: CreateAbsensiDto,
  ): Promise<AttendanceEntity> {
    const attendance = this.AttendanceRepository.create(createAbsensiDto);
    return this.AttendanceRepository.save(attendance);
  }

  async findByIdStaff(id: number): Promise<StaffDataEntity | null> {
    return this.StaffDataRepository.findOne({
      where: { id_karyawan: id },
    });
  }

  async findByIdStaffAbsensi(id: number): Promise<AttendanceEntity[] | null> {
    return this.AttendanceRepository.find({
      where: { id_karyawan: id },
    });
  }
}
