import { Test, TestingModule } from '@nestjs/testing';
import { HolidaysService } from './holidays.service';
import { Holiday } from './entities/holiday.entity';

describe('HolidaysService', () => {
  let service: HolidaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HolidaysService],
    }).compile();

    service = module.get<HolidaysService>(HolidaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const holidays: Holiday[] = [
    {
      id: 1,
      configurationId: 1,
      from: '2022-12-31',
      to: '2022-12-31',
      event: 'Public Holiday',
      createdAt: new Date().toISOString(),
    },
  ];
  describe('isItHoliday', () => {
    it('should return true if date is within holiday range', () => {
      const date = '2022-12-31';
      expect(service.isItHoliday(holidays, date)).toBe(true);
    });

    it('should return false if date is not within holiday range', () => {
      const date = '2023-01-04';
      expect(service.isItHoliday(holidays, date)).toBe(false);
    });
  });
});
