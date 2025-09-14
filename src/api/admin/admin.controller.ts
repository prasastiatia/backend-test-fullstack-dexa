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
import { CreateStaffDto } from './dto/create-staff.dto';
import { AdminService } from './admin.service';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { NotAuthorizedCampaignException } from 'src/common/interceptors/custom-error.exception';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  getDashboard() {
    // akses user dari req.user
    return { data: 'hanya untuk user yang sudah login' };
  }

  @Post('/dashboard/add-staff')
  async registerStaff(@Body() createStaffDto: CreateStaffDto) {
    return this.adminService.createStaff(createStaffDto);
  }

  @Get('/dashboard/:id/staff')
  async findStaff(@Param('id') idStaff: string, @Request() req: Request) {
    const token: any = (req as any).user;
    const id = token?.id || null;

    if (id !== null) {
      const result = await this.adminService.findByIdStaff(+idStaff);
      return result;
    }
    throw new NotAuthorizedCampaignException('Invalid or expired token');
  }

  @Get('/dashboard/all-staff')
  async findAllStaff(@Request() req: Request) {
    const token: any = (req as any).user;
    const id = token?.id || null;

    if (id !== null) {
      const result = await this.adminService.findAllStaff();
      return result;
    }
    throw new NotAuthorizedCampaignException('Invalid or expired token');
  }

  @Put('/dashboard/:id/update-staff')
  async update(
    @Param('id') idStaff: number,
    @Body() updateStaffDto: UpdateStaffDto,
    @Request() req,
  ) {
    const token: any = (req as any).user;
    const id = token?.id || null;

    if (id !== null) {
      const result = await this.adminService.updateStaff(
        idStaff,
        updateStaffDto,
      );
      return result;
    }
    throw new NotAuthorizedCampaignException('Invalid or expired token');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') idStaff: string, @Req() req: Request) {
    const token: any = (req as any).user;
    const id = token?.id || null;

    if (id !== null) {
      await this.adminService.removeStaff(+idStaff);
      return 'success deleted';
    }
    throw new NotAuthorizedCampaignException('Invalid or expired token');
  }
}
