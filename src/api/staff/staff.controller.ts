import {
  Controller,
  UseGuards,
  Body,
  Get,
  Post,
  Put,
  Param,
  Req,
  Delete,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAbsensiDto } from './dto/create-attendance.dto';
import { StaffService } from './staff.service';
import { NotAuthorizedCampaignException } from 'src/common/interceptors/custom-error.exception';

@Controller('staff')
@UseGuards(JwtAuthGuard)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post('/create-attendance')
  async createAttendance(
    @Body() createAbsensiDto: CreateAbsensiDto,
    @Request() req: Request,
  ) {
    const token: any = (req as any).user;
    const id = token?.id || null;

    const tanggal = createAbsensiDto.tanggal
      ? createAbsensiDto.tanggal
      : new Date();
    if (id !== null) {
      const createAbsensiRequest = {
        ...createAbsensiDto,
        id_karyawan: id,
        tanggal,
      };
      return this.staffService.createAbsensi(createAbsensiRequest);
    }
  }

  @Get('/profile')
  async findStaff(@Request() req: Request) {
    const token: any = (req as any).user;
    const id = token?.id || null;

    if (id !== null) {
      const result = await this.staffService.findByIdStaff(+id);
      return result;
    }
    throw new NotAuthorizedCampaignException('Invalid or expired token');
  }

  @Get('/attendance')
  async findStaffAbsensi(@Request() req: Request) {
    const token: any = (req as any).user;
    const id = token?.id || null;

    if (id !== null) {
      const result = await this.staffService.findByIdStaffAbsensi(+id);
      return result;
    }
    throw new NotAuthorizedCampaignException('Invalid or expired token');
  }
}
