import { Test } from '@nestjs/testing';
import { WorkingHoursService } from './working_hours.service';
import { AppointmentsService } from '../appointments/appointments.service';
import { BreaksService } from '../breaks/breaks.service';
import { WorkingHour } from './entities/working_hour.entity';
import { Configuration } from 'src/configurations/entities/configuration.entity';

describe('WorkingHoursService', () => {
  let service: WorkingHoursService;

  beforeEach(async () => {
    const breakServiceMock = {
      isSlotOverlappingWithBreak: jest.fn(),
    };
    const module = await Test.createTestingModule({
      providers: [
        WorkingHoursService,
        { provide: AppointmentsService, useValue: {} },
        { provide: BreaksService, useValue: breakServiceMock },
      ],
    }).compile();
    service = module.get<WorkingHoursService>(WorkingHoursService);
  });

  describe('workingHoursOfDay', () => {
    it('should return a list of time slots for a given day', async () => {
      const configuration: Configuration = {
        id: 1,
        eventType: 'Appointment',
        bufferTime: 30,
        visibleDays: 7,
        appointmentsPerSlot: 1,
        slotDuration: 30,
        createdAt: new Date().toISOString(),
        holidays: [],
        workingHours: [
          {
            id: 1,
            configurationId: 1,
            day: 2,
            from: '08:00:00',
            to: '20:00:00',
            createdAt: new Date().toISOString(),
          },
        ],
        breaks: [],
      };
      const date = '2023-01-03';
      const expectedSlots = ['08:00:00', '08:15:00', '08:45:00', '09:00:00'];

      jest
        .spyOn(service.breakService, 'isSlotOverlappingWithBreak')
        .mockReturnValue(false);
      jest.spyOn(service, 'isThresholdReached').mockResolvedValue(false);

      const slots = await service.workingHoursOfDay(configuration, date);
      expect(slots).toBeInstanceOf(Array);
      slots.forEach((slot) => {
        expect(typeof slot).toBe('string');
      });
    });
  });

  describe('isDayConfigured', () => {
    it('should return true if the given day is configured in the working hours list', () => {
      const workingHours: WorkingHour[] = [
        {
          id: 1,
          configurationId: 1,
          day: 1,
          from: '08:00:00',
          to: '20:00:00',
          createdAt: new Date().toISOString(),
        },
      ];
      const date = '2023-01-02';

      const result = service.isDayConfigured(workingHours, date);
      expect(result).toBe(true);
    });

    it('should return false if the given day is not configured in the working hours list', () => {
      const workingHours: WorkingHour[] = [
        {
          id: 1,
          configurationId: 1,
          day: 2,
          from: '08:00:00',
          to: '20:00:00',
          createdAt: new Date().toISOString(),
        },
      ];
      const date = '2023-01-01';

      const result = service.isDayConfigured(workingHours, date);
      expect(result).toBe(false);
    });
  });
});
