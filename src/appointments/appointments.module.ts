import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [TypeOrmModule.forFeature([Appointment]), UsersModule, HttpModule],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
