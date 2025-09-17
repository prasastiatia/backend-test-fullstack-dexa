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
import { NotAuthorizedCampaignException } from '../../common/interceptors/custom-error.exception';
import { ResponseSuccessDto } from '../../common/dto/response.dto';

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

    const idKaryawan = createAbsensiDto.id_karyawan ? createAbsensiDto : id;

    if (id !== null) {
      const createAbsensiRequest = {
        ...createAbsensiDto,
        id_karyawan: idKaryawan,
        tanggal,
      };
      return this.staffService.createAbsensi(createAbsensiRequest);
    }
  }

  @Get('/profiles')
  async findStaff(@Request() req: Request) {
    const token: any = (req as any).user;
    const id = token?.id || null;

    if (id !== null) {
      const result = await this.staffService.findByIdStaff(+id);
      return result;
    }
    throw new NotAuthorizedCampaignException('Invalid or expired token');
  }

  @Get('/profile/:id')
  async findStaffById(@Request() req: Request, @Param('id') id: string) {
    const token: any = (req as any).user;
    const idToken = token?.id || null;

    console.log('profile==', id);

    if (idToken !== null) {
      const result = await this.staffService.findByIdStaff(+id);
      delete result.password;
      return new ResponseSuccessDto('success', result);
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
