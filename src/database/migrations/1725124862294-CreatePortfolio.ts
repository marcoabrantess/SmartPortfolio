import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePortfolio1725124862294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Verifica se a tabela não existe antes de criar
        const tableExists = await queryRunner.hasTable('portfolios');
        if (!tableExists) {
            await queryRunner.createTable(
                new Table({
                    name: "portfolios",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "user_id",
                            type: "uuid",
                            isNullable: false
                        }
                    ]
                })
            );

            await queryRunner.createForeignKey(
                "portfolios",
                new TableForeignKey({
                    columnNames: ["user_id"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE"
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable('portfolios');
        if (tableExists) {
            await queryRunner.dropForeignKey("portfolios", "FK_PORTFOLIOS_USER");
            await queryRunner.dropTable("portfolios");
        }
    }
}
