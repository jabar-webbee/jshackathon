import { Injectable } from '@nestjs/common';
import { format, parseISO, addMinutes, parse, isPast } from 'date-fns';
import { AppointmentsService } from '../appointments/appointments.service';
import { BreaksService } from '../breaks/breaks.service';
import { Configuration } from '../configurations/entities/configuration.entity';
import { WorkingHour } from './entities/working_hour.entity';

@Injectable()
export class WorkingHoursService {
  constructor(
    readonly breakService: BreaksService,
    private readonly appointmentService: AppointmentsService,
  ) {}

  workingHoursOfDay(configuration: Configuration, date: string) {
    const workingHour = configuration.workingHours.find((workingHour) => {
      return workingHour.day == +format(parseISO(date), 'i');
    });
    return this.slotsOfTheDay(workingHour, configuration, date);
  }

  isDayConfigured(workingHours: WorkingHour[], date: string) {
    return workingHours.find((workingHour) => {
      return workingHour.day == +format(parseISO(date), 'i');
    })
      ? true
      : false;
  }

  async slotsOfTheDay(
    workingHour: WorkingHour,
    configuration: Configuration,
    date: string,
  ) {
    const slots = [];
    let slot = workingHour.from;
    while (slot < workingHour.to) {
      if (
        this.breakService.isSlotOverlappingWithBreak(slot, configuration.breaks)
      ) {
        slot = this.breakService.getEndOfBreak();
      }
      if (
        !(await this.isThresholdReached(slot, configuration, date)) &&
        !isPast(parseISO(`${date} ${slot}`))
      ) {
        slots.push(slot);
      }
      slot = this.addMinutesToTimeString(
        slot,
        configuration.bufferTime + configuration.slotDuration,
      );
    }
    return slots;
  }

  addMinutesToTimeString(timeString, minutesToAdd) {
    const time = parse(timeString, 'HH:mm:ss', new Date());
    const updatedTime = addMinutes(time, minutesToAdd);
    return format(updatedTime, 'HH:mm:ss');
  }

  async isThresholdReached(
    slot: string,
    configuration: Configuration,
    date: string,
  ) {
    const count = await this.appointmentService.appointmentsAtSameTime(
      `${date} ${slot}`,
      configuration.id,
    );
    return count >= configuration.appointmentsPerSlot;
  }
}
