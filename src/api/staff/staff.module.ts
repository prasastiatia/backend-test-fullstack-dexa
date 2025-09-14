import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffController } from './staff.controller';
import { StaffDataEntity } from './entities/staff.entity';
import { AttendanceEntity } from './entities/attendance.entity';
import { StaffRepository } from './repositories/staff.repository';
import { StaffService } from './staff.service';

@Module({
  imports: [TypeOrmModule.forFeature([StaffDataEntity, AttendanceEntity])],
  controllers: [StaffController],
  providers: [StaffRepository, StaffService],
  exports: [StaffService],
})
export class StaffModule {}
