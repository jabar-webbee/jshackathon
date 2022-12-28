import { IsNotEmpty, IsEmail, IsDate } from 'class-validator';

export class BookAppointmentDTO {
  @IsNotEmpty()
  eventId: string;

  @IsNotEmpty()
  appointments: Appointment[];
}

export class Appointment {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsDate()
  appointmentAt: string;
}
