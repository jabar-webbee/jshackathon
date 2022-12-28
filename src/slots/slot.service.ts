import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configurations/configuration.service';
import { Configuration } from '../configurations/entities/configuration.entity';
import { format, addDays } from 'date-fns';
import { HolidaysService } from '../holidays/holidays.service';
import { WorkingHoursService } from '../working_hours/working_hours.service';
import { EventSlotsDTO } from './dto/event_slot.dto';

@Injectable()
export class SlotService {
  constructor(
    private readonly configurationService?: ConfigurationService,
    private readonly holidayService?: HolidaysService,
    private readonly workingHourService?: WorkingHoursService,
  ) {}

  async getAllSlots(eventId: number): Promise<any> {
    const configuration = await this.configurationService.findAllWithRelations(
      eventId,
    );
    return {
      event: {
        eventType: configuration.eventType,
        eventId: configuration.id,
      },
      slots: await this.makeSlots(configuration),
    };
    // await Promise.all(
    //   configurations.map(async (configuration) => {
    //     slots = {
    //       event: {
    //         eventType: configuration.eventType,
    //         eventId: configuration.id,
    //       },
    //       slots: await this.makeSlots(configuration),
    //     };
    //   }),
    // );
    // return slots;
  }
  async makeSlots(configuration: Configuration) {
    let daysAdded = 0;
    const slots = {};
    while (Object.keys(slots).length < configuration.visibleDays) {
      const date = format(addDays(new Date(), daysAdded), 'yyyy-MM-dd');
      daysAdded++;
      if (
        this.holidayService.isItHoliday(configuration.holidays, date) ||
        !this.workingHourService.isDayConfigured(
          configuration.workingHours,
          date,
        )
      )
        continue;
      slots[date] = await this.workingHourService.workingHoursOfDay(
        configuration,
        date,
      );
    }
    return slots;
  }
}
