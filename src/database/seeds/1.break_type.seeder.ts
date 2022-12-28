import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { BreakType } from '../../breaks/entities/break_type.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(BreakType);
    await repository.insert([
      {
        name: 'Lunch',
      },
      {
        name: 'Cleaning',
      },
    ]);
  }
}
