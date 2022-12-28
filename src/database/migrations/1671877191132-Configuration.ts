import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Configuration1671877191132 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'configuration',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'eventType', type: 'varchar' },
          { name: 'bufferTime', type: 'integer' },
          { name: 'visibleDays', type: 'integer' },
          { name: 'appointmentsPerSlot', type: 'integer' },
          { name: 'slotDuration', type: 'integer' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('configuration');
  }
}
