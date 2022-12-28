import { Configuration } from '../../configurations/entities/configuration.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class WorkingHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  configurationId: number;

  @Column()
  day: number;

  @Column({ type: 'date' })
  from: string;

  @Column({ type: 'date' })
  to: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => Configuration, (configuration) => configuration.workingHours)
  configuration?: Configuration;
}
