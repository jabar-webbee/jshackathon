import { Configuration } from '../../configurations/entities/configuration.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BreakType } from './break_type.entity';

@Entity()
export class Break {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  configurationId: number;

  @Column()
  breakTypeId: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToOne(() => BreakType)
  @JoinColumn()
  breakType: BreakType;

  @ManyToOne(() => Configuration, (configuration) => configuration.breaks)
  configuration: Configuration;
}
