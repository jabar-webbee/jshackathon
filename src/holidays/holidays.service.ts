import { Injectable } from '@nestjs/common';
import { Holiday } from './entities/holiday.entity';

@Injectable()
export class HolidaysService {
  isItHoliday(holidays: Holiday[], date: string) {
    return holidays.find((holiday) => {
      return (
        Date.parse(holiday.from) <= Date.parse(date) &&
        Date.parse(holiday.to) >= Date.parse(date)
      );
    })
      ? true
      : false;
  }
}
