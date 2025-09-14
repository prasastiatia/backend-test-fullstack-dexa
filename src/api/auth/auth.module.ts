import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminEntity } from './entities/admin.entity';
import { StaffEntity } from './entities/staff.entity';
import { AuthRepository } from './repositories/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, StaffEntity]),
    PassportModule,
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        'ae76831415297846409d1509ed97b254794b5a0d23413c0d738928cbb82903d2', // Pastikan secret ada
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
