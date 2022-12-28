import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  configurationId: number;

  @Column()
  appointmentAt: number;

  @CreateDateColumn()
  createdAt: Date;
}
