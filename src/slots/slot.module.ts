import { Module } from '@nestjs/common';
import { SlotService } from './slot.service';
import { SlotController } from './slot.controller';
import { AppointmentsModule } from '../appointments/appointments.module';
import { BreaksModule } from '../breaks/breaks.module';
import { HolidaysModule } from '../holidays/holidays.module';
import { UsersModule } from '../users/users.module';
import { WorkingHoursModule } from '../working_hours/working_hours.module';
import { ConfigurationModule } from '../configurations/configuration.module';

@Module({
  imports: [
    AppointmentsModule,
    BreaksModule,
    HolidaysModule,
    UsersModule,
    WorkingHoursModule,
    ConfigurationModule,
  ],
  controllers: [SlotController],
  providers: [SlotService],
  exports: [SlotService],
})
export class SlotModule {}
