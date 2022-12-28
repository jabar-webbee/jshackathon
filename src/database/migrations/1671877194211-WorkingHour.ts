import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class WorkingHour1671877194211 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'working_hour',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'configurationId', type: 'integer' },
          { name: 'day', type: 'integer' },
          { name: 'from', type: 'varchar' },
          { name: 'to', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'working_hour',
      new TableForeignKey({
        columnNames: ['configurationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'configuration',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('working_hour');
  }
}
