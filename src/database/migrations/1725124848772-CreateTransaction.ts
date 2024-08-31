import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTransaction1725124848772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transactions",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "amount",
                        type: "integer",
                        isNullable: false
                    },
                    {
                        name: "type",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false
                    },
                    {
                        name: "date",
                        type: "date",
                        isNullable: false
                    },
                    {
                        name: "portfolio_id",
                        type: "uuid",
                        isNullable: false
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "transactions",
            new TableForeignKey({
                columnNames: ["portfolio_id"],
                referencedTableName: "portfolios",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("transactions", "FK_TRANSACTIONS_PORTFOLIO");
        await queryRunner.dropTable("transactions");
    }
}
