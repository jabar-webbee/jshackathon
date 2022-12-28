import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BreakType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
