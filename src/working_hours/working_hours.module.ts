import { Module } from '@nestjs/common';
import { WorkingHoursService } from './working_hours.service';
import { WorkingHoursController } from './working_hours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingHour } from './entities/working_hour.entity';
import { BreaksService } from '../breaks/breaks.service';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  controllers: [WorkingHoursController],
  providers: [WorkingHoursService, BreaksService],
  imports: [TypeOrmModule.forFeature([WorkingHour]), AppointmentsModule],
  exports: [WorkingHoursService, BreaksService],
})
export class WorkingHoursModule {}
