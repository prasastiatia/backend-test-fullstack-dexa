import { AttendanceEntity } from '../entities/attendance.entity';
import { CreateAbsensiDto } from '../dto/create-attendance.dto';

export interface IStaffRepository {
  createAttendance(
    CreateAbsensiDto: CreateAbsensiDto,
  ): Promise<AttendanceEntity>;
}
