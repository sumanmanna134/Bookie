import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { DBTable } from "../../constant/DbTable";

export class CreateBooksTable1678647921716 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DBTable.BOOKS,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: false,
          },
          {
            name: "authorId",
            type: "int",
            isNullable: false,
          },
          {
            name: "price",
            type: "int",
            isNullable: false,
          },
          {
            name: "category",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "image",
            type: "varchar",
            length: "255",
            isNullable: true,
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

    await queryRunner.createForeignKey(
      DBTable.BOOKS,
      new TableForeignKey({
        columnNames: ["authorId"],
        referencedColumnNames: ["id"],
        referencedTableName: DBTable.AUTHORS,
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DBTable.BOOKS);
  }
}
