import { Break } from '../../breaks/entities/break.entity';
import { Holiday } from '../../holidays/entities/holiday.entity';
import { WorkingHour } from '../../working_hours/entities/working_hour.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventType: string;

  @Column({
    comment: 'The buffer time in minutes between two slots.',
  })
  bufferTime: number;

  @Column({
    comment: 'Return slots for N number of days',
  })
  visibleDays: number;

  @Column()
  appointmentsPerSlot: number;

  @Column({ comment: 'In minutes' })
  slotDuration: number;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => Holiday, (holiday) => holiday.configuration)
  holidays: Holiday[];

  @OneToMany(() => WorkingHour, (workingHour) => workingHour.configuration)
  workingHours: WorkingHour[];

  @OneToMany(() => Break, (brk) => brk.configuration)
  breaks: Break[];
}
