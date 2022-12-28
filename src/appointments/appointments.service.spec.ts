import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { HttpService } from '@nestjs/axios';
import { format, parseISO } from 'date-fns';
import { Appointment, BookAppointmentDTO } from './dto/book_appointment.dto';
import { EventSlotsDTO } from '../slots/dto/event_slot.dto';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let repository: Repository<Appointment>;
  let usersService: UsersService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getRepositoryToken(Appointment),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    repository = module.get<Repository<Appointment>>(
      getRepositoryToken(Appointment),
    );
    usersService = module.get<UsersService>(UsersService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('appointmentsAtSameTime', () => {
    it('should return the correct number of appointments at the same time', async () => {
      const datetime = '2022-12-28T15:00:00.000Z';
      const configurationId = 1;
      jest.spyOn(repository, 'count').mockResolvedValue(3);
      const result = await service.appointmentsAtSameTime(
        datetime,
        configurationId,
      );
      expect(result).toBe(3);
      expect(repository.count).toHaveBeenCalledWith({
        where: {
          appointmentAt: +format(parseISO(datetime), 't'),
          configurationId,
        },
      });
    });
  });

  describe('book', () => {
    it('should book appointments for the given users and return a response object', async () => {
      const bookAppointmentDTO: BookAppointmentDTO = {
        eventId: '1',
        appointments: [
          {
            email: 'user1@example.com',
            firstName: 'User',
            lastName: 'One',
            appointmentAt: '2022-12-29 08:00:00',
          },
          {
            email: 'user2@example.com',
            firstName: 'User',
            lastName: 'Two',
            appointmentAt: '2022-12-29 10:00:00',
          },
        ],
      };
      const allSlots = {
        event: {
          eventType: 'Men Haircut',
          eventId: 1,
        },
        slots: {
          '2022-12-29': ['08:00:00', '10:00:00'],
        },
      };
      jest
        .spyOn(service, 'getAllSlots')
        .mockResolvedValue(allSlots as EventSlotsDTO);

      jest.spyOn(repository, 'create').mockReturnThis();
      jest.spyOn(repository, 'save').mockReturnThis();

      jest.spyOn(usersService, 'findOne').mockReturnThis();
      jest.spyOn(usersService, 'create').mockReturnThis();

      const result = await service.book(bookAppointmentDTO);

      expect(result).toEqual({
        'user1@example.com': 'Appointment Booked at 2022-12-29 08:00:00',
        'user2@example.com': 'Appointment Booked at 2022-12-29 10:00:00',
      });
      expect(service.getAllSlots).toHaveBeenCalledWith(1);
    });
  });
});
