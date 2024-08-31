import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAsset1725124871777 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Verifica se a tabela não existe antes de criar
        const tableExists = await queryRunner.hasTable('assets');
        if (!tableExists) {
            await queryRunner.createTable(
                new Table({
                    name: "assets",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "code",
                            type: "varchar",
                            isNullable: false
                        },
                        {
                            name: "current_value",
                            type: "decimal",
                            precision: 10,
                            scale: 2,
                            isNullable: false
                        },
                        {
                            name: "name",
                            type: "varchar",
                            isNullable: false
                        },
                        {
                            name: "yield",
                            type: "decimal",
                            precision: 5,
                            scale: 2,
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
                "assets",
                new TableForeignKey({
                    columnNames: ["portfolio_id"],
                    referencedTableName: "portfolios",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE"
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable('assets');
        if (tableExists) {
            await queryRunner.dropForeignKey("assets", "FK_ASSETS_PORTFOLIO");
            await queryRunner.dropTable("assets");
        }
    }
}
