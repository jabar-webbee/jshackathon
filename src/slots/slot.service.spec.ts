import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from '../configurations/configuration.service';
import { HolidaysService } from '../holidays/holidays.service';
import { WorkingHoursService } from '../working_hours/working_hours.service';
import { EventSlotsDTO } from './dto/event_slot.dto';
import { SlotService } from './slot.service';

describe('SlotService', () => {
  let service: SlotService;
  let configurationService: ConfigurationService;
  let holidaysService: HolidaysService;
  let workingHoursService: WorkingHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlotService,
        {
          provide: ConfigurationService,
          useValue: {
            findAllWithRelations: jest.fn(),
          },
        },
        {
          provide: HolidaysService,
          useValue: {
            isItHoliday: jest.fn(),
          },
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

    service = module.get<SlotService>(SlotService);
    configurationService =
      module.get<ConfigurationService>(ConfigurationService);
    holidaysService = module.get<HolidaysService>(HolidaysService);
    workingHoursService = module.get<WorkingHoursService>(WorkingHoursService);
  });

  it('should return event slots for the given event id', async () => {
    const eventId = 1;
    const configuration = {
      id: eventId,
      eventType: 'Event Type',
      bufferTime: 10,
      visibleDays: 5,
      appointmentsPerSlot: 3,
      slotDuration: 30,
      createdAt: '2023-01-01',
      holidays: [],
      workingHours: [],
      breaks: [],
    };
    const findAllWithRelationsSpy = jest.spyOn(
      configurationService,
      'findAllWithRelations',
    );
    findAllWithRelationsSpy.mockImplementation(() =>
      Promise.resolve(configuration),
    );
    const isDayConfiguredSpy = jest.spyOn(
      workingHoursService,
      'isDayConfigured',
    );
    isDayConfiguredSpy.mockReturnValue(true);
    const workingHoursOfDaySpy = jest.spyOn(
      workingHoursService,
      'workingHoursOfDay',
    );
    workingHoursOfDaySpy.mockImplementation(() =>
      Promise.resolve(['09:00', '10:00']),
    );

    const result = await service.getAllSlots(eventId);

    const expectedResult: Partial<EventSlotsDTO> = {
      event: {
        eventType: expect.any(String),
        eventId: expect.any(Number),
      },
      slots: expect.any(Object),
    };
    expect(result).toEqual(expectedResult);
  });
});
