import {
  INestApplication,
  ValidationPipe,
  HttpStatus,
  HttpServer,
} from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSlotsDTO } from '../src/slots/dto/event_slot.dto';
import { SlotModule } from '../src/slots/slot.module';
import * as request from 'supertest';

describe('SlotService', () => {
  let app: INestApplication;
  let httpServer: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SlotModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'ansjabar',
          password: 'abcd1234',
          database: 'hackathontest',
          autoLoadEntities: true,
          synchronize: false,
          dropSchema: false,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
    httpServer = app.getHttpServer();
  });

  it('should return available slots', () => {
    const expectedResponse = new EventSlotsDTO();
    return request(httpServer)
      .get('/slot/1')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(expectedResponse);
      });
  });

  httpServer = app.getHttpServer();
  it('Slot should be booked', () => {
    const appointment = {
      eventId: 2,
      appointments: [
        {
          email: 'email_one@mail.com',
          firstName: 'First',
          lastName: 'Last',
          appointmentAt: '2022-12-28 13:05:00',
        },
        {
          email: 'email_two@mail.com',
          firstName: 'First',
          lastName: 'Last',
          appointmentAt: '2022-12-28 19:30:00',
        },
      ],
    };
    return request(httpServer)
      .post('/appointments')
      .send(appointment)
      .expect(HttpStatus.OK);
  });
  afterAll(async () => {
    await app.close();
  });
});
