import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { StaffAdminEntity } from './entities/staff.entity';
import { AdminRepository } from './repositories/admin.repository';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([StaffAdminEntity])],
  controllers: [AdminController],
  providers: [AdminRepository, AdminService],
  exports: [AdminService],
})
export class AdminModule {}
