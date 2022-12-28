import { Body, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { EventSlotsDTO } from '../slots/dto/event_slot.dto';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { BookAppointmentDTO } from './dto/book_appointment.dto';
import { CreateAppointmentDTO } from './dto/create_appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { format, parseISO } from 'date-fns';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly userService: UsersService,
    private readonly httpService: HttpService,
  ) {}

  appointmentsAtSameTime(datetime: string, configurationId: number) {
    return this.appointmentRepository.count({
      where: {
        appointmentAt: +format(parseISO(datetime), 't'),
        configurationId,
      },
    });
  }

  async book(@Body() bookAppointmentDTO: BookAppointmentDTO) {
    const response = {};
    const { eventId, appointments } = bookAppointmentDTO;
    const allSlots = await this.getAllSlots(+eventId);
    const createAppointmentPromises = appointments.map(async (appointment) => {
      const { email, firstName, lastName, appointmentAt } = appointment;
      if (this.isSlotAvailable(appointmentAt, allSlots)) {
        response[email] = `Appointment Booked at ${appointmentAt}`;
        let user = await this.userService.findOne(email);
        if (!user) {
          user = await this.userService.create({
            email,
            firstName,
            lastName,
          });
        }
        this.create({
          userId: user.id,
          configurationId: +eventId,
          appointmentAt: +format(parseISO(appointmentAt), 't'),
        });
      } else {
        response[email] = `Slot not available at ${appointmentAt}`;
      }
    });
    await Promise.all(createAppointmentPromises);
    return response;
  }

  async create(
    createAppointmentDTO: CreateAppointmentDTO,
  ): Promise<Appointment> {
    const newAppointment =
      this.appointmentRepository.create(createAppointmentDTO);
    return this.appointmentRepository.save(newAppointment);
  }
  isSlotAvailable(appointmentAt: string, availableSlots: EventSlotsDTO) {
    const date = format(parseISO(appointmentAt), 'yyyy-MM-dd');
    const time = format(parseISO(appointmentAt), 'HH:mm:ss');
    const slotsOfDay = availableSlots.slots[date];
    if (!slotsOfDay) return false;
    return slotsOfDay.find((slotOfDay) => {
      return time == slotOfDay;
    })
      ? true
      : false;
  }
  async getAllSlots(eventId: number): Promise<EventSlotsDTO> {
    const response = await this.httpService
      .get(`http://localhost:3000/slot/${eventId}`)
      .toPromise();
    return response.data;
  }
}
