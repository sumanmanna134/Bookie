import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { DBTable } from "../../constant/DbTable";

export class CreateAuthorsTable1678290050478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DBTable.AUTHORS,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isNullable: false,
            isUnique: true,
          },

          {
            name: "bio",
            type: "text",
            isNullable: false,
          },
          {
            name: "image",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "createdAt",
            type: "datetime",
            default: "now()",
            isNullable: true,
          },
          {
            name: "updatedAt",
            type: "datetime",
            default: "now()",
            isNullable: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DBTable.AUTHORS);
  }
}
