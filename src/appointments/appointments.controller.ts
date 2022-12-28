import { Body, Controller, Post, Get } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { BookAppointmentDTO } from './dto/book_appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async book(@Body() bookAppointmentDTO: BookAppointmentDTO) {
    return this.appointmentsService.book(bookAppointmentDTO);
  }
}
