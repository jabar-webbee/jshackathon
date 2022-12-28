import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Holiday1671877201422 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'holiday',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'configurationId', type: 'integer' },
          { name: 'event', type: 'varchar' },
          { name: 'from', type: 'date' },
          { name: 'to', type: 'date' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('holiday', [
      new TableForeignKey({
        columnNames: ['configurationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'configuration',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('holiday');
  }
}
