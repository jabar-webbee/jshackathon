import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Break1671877192665 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'break',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'configurationId', type: 'integer' },
          { name: 'breakTypeId', type: 'integer' },
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
    await queryRunner.createForeignKeys('break', [
      new TableForeignKey({
        columnNames: ['configurationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'configuration',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['breakTypeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'break_type',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('break');
  }
}
