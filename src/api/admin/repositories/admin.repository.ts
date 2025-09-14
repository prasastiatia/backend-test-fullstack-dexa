import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffAdminEntity } from '../entities/staff.entity';
import { CreateStaffDto } from '../dto/create-staff.dto';

import { IAdminRepository } from '../interfaces/admin-repository.interface';
import { UpdateStaffDto } from '../dto/update-staff.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(
    @InjectRepository(StaffAdminEntity)
    private readonly StaffRepository: Repository<StaffAdminEntity>,
  ) {}

  async createStaff(createStaffDto: CreateStaffDto): Promise<StaffAdminEntity> {
    const staff = this.StaffRepository.create(createStaffDto);
    return this.StaffRepository.save(staff);
  }

  async findByIdStaff(id: number): Promise<StaffAdminEntity | null> {
    return this.StaffRepository.findOne({
      where: { id_karyawan: id },
    });
  }

  async findAllStaff(): Promise<StaffAdminEntity[] | null> {
    return this.StaffRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findByEmail(email: string): Promise<StaffAdminEntity | undefined> {
    return this.StaffRepository.findOne({ where: { email } });
  }

  async updateStaff(
    id: number,
    updateStaffDto: UpdateStaffDto,
  ): Promise<StaffAdminEntity> {
    await this.StaffRepository.update(
      id,
      updateStaffDto as QueryDeepPartialEntity<StaffAdminEntity>,
    );
    const updated = await this.findByIdStaff(id);
    if (!updated) {
      throw new Error('Staff not found');
    }
    return updated;
  }

  async deleteStaff(id: number): Promise<void> {
    await this.StaffRepository.delete(id);
  }
}
