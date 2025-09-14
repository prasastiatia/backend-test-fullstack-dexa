import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AdminEntity } from '../../api/auth/entities/admin.entity';
import { StaffEntity } from '../../api/auth/entities/staff.entity';
import { StaffAdminEntity } from '../../api/admin/entities/staff.entity';
import { AttendanceEntity } from '../../api/staff/entities/attendance.entity';
import { StaffDataEntity } from '../../api/staff/entities/staff.entity';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOSTNAME'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      timezone: 'Z',
      entities: [
        AdminEntity,
        StaffEntity,
        StaffAdminEntity,
        AttendanceEntity,
        StaffDataEntity,
      ],
      synchronize: false,
    };
  }
}
