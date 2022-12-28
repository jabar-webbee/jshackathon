import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { WorkingHour } from '../../working_hours/entities/working_hour.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(WorkingHour);
    await repository.insert([
      {
        configurationId: 1,
        day: 1,
        from: '08:00:00',
        to: '20:00:00',
      },
      {
        configurationId: 1,
        day: 2,
        from: '08:00:00',
        to: '20:00:00',
      },
      {
        configurationId: 1,
        day: 3,
        from: '08:00:00',
        to: '20:00:00',
      },
      {
        configurationId: 1,
        day: 4,
        from: '08:00:00',
        to: '20:00:00',
      },
      {
        configurationId: 1,
        day: 5,
        from: '08:00:00',
        to: '20:00:00',
      },
      {
        configurationId: 1,
        day: 6,
        from: '10:00:00',
        to: '22:00:00',
      },
      {
        configurationId: 2,
        day: 1,
        from: '08:00:00',
        to: '20:00:00',
      },
      {
        configurationId: 2,
        day: 2,
        from: '08:00:00',
        to: '20:00:00',
      },
      {
        configurationId: 2,
        day: 3,
        from: '08:00:00',
        to: '20:00:00',
      },
      {
        configurationId: 2,
        day: 4,
        from: '08:00:00',
        to: '20:00:00',
      },
      {
        configurationId: 2,
        day: 5,
        from: '08:00:00',
        to: '20:00:00',
      },
      {
        configurationId: 2,
        day: 6,
        from: '10:00:00',
        to: '22:00:00',
      },
    ]);
  }
}
