import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from '../configurations/configuration.service';
import { HolidaysService } from '../holidays/holidays.service';
import { WorkingHoursService } from '../working_hours/working_hours.service';
import { SlotService } from './slot.service';

describe('SlotService', () => {
  let slotService: SlotService;
  let configurationService: ConfigurationService;
  let holidaysService: HolidaysService;
  let workingHoursService: WorkingHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlotService,
        {
          provide: ConfigurationService,
          useValue: { findAllWithRelations: jest.fn() },
        },
        {
          provide: HolidaysService,
          useValue: { isItHoliday: jest.fn() },
        },
        {
          provide: WorkingHoursService,
          useValue: {
            isDayConfigured: jest.fn(),
            workingHoursOfDay: jest.fn(),
          },
        },
      ],
    }).compile();

    slotService = module.get<SlotService>(SlotService);
    configurationService =
      module.get<ConfigurationService>(ConfigurationService);
    holidaysService = module.get<HolidaysService>(HolidaysService);
    workingHoursService = module.get<WorkingHoursService>(WorkingHoursService);
  });

  describe('getAllSlots', () => {
    it('should return an array of event slots', async () => {
      // Arrange
      const eventId = 1;
      const configurations = [
        {
          id: 1,
          eventType: 'Test',
          visibleDays: 3,
          holidays: ['2022-12-25'],
          workingHours: [
            {
              dayOfWeek: 1,
              startTime: '09:00',
              endTime: '17:00',
            },
          ],
        },
      ];
      jest
        .spyOn(configurationService, 'findAllWithRelations')
        .mockResolvedValue(configurations);
      jest.spyOn(holidaysService, 'isItHoliday').mockReturnValue(false);
      jest.spyOn(workingHoursService, 'isDayConfigured').mockReturnValue(true);
      jest.spyOn(workingHoursService, 'workingHoursOfDay').mockResolvedValue({
        '2022-12-27': [
          {
            startTime: '09:00',
            endTime: '10:00',
          },
          {
            startTime: '11:00',
            endTime: '12:00',
          },
        ],
      });

      // Act
      const result = await slotService.getAllSlots(eventId);

      // Assert
      expect(result).toEqual([
        {
          event: {
            eventType: 'Test',
            eventId: 1,
          },
          slots: {
            '2022-12-27': [
              {
                startTime: '09:00',
                endTime: '10:00',
              },
              {
                startTime: '11:00',
                endTime: '12:00',
              },
            ],
          },
        },
      ]);
    });
  });
});
