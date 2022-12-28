import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Holiday } from '../../holidays/entities/holiday.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Holiday);
    await repository.insert([
      {
        configurationId: 1,
        event: 'Public Holiday',
        from: '2023-01-10',
        to: '2023-01-10',
      },
      {
        configurationId: 2,
        event: 'Public Holiday',
        from: '2023-01-10',
        to: '2023-01-10',
      },
    ]);
  }
}
