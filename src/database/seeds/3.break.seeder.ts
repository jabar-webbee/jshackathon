import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Break } from '../../breaks/entities/break.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Break);
    await repository.insert([
      {
        configurationId: 1,
        breakTypeId: 1,
        from: '12:00:00',
        to: '13:00:00',
      },
      {
        configurationId: 1,
        breakTypeId: 2,
        from: '15:00:00',
        to: '16:00:00',
      },
      {
        configurationId: 2,
        breakTypeId: 1,
        from: '12:00:00',
        to: '13:00:00',
      },
      {
        configurationId: 2,
        breakTypeId: 2,
        from: '15:00:00',
        to: '16:00:00',
      },
    ]);
  }
}
