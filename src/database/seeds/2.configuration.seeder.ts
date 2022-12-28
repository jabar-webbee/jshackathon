import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Configuration } from '../../configurations/entities/configuration.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Configuration);
    await repository.insert([
      {
        eventType: 'Men Haircut',
        bufferTime: 5,
        visibleDays: 7,
        appointmentsPerSlot: 3,
        slotDuration: 10,
      },
      {
        eventType: 'Women Haircut',
        bufferTime: 10,
        visibleDays: 7,
        appointmentsPerSlot: 3,
        slotDuration: 60,
      },
    ]);
  }
}
