import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAsset1725221328332 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
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
                        name: "quantity",
                        type: "integer",
                        isNullable: false
                    },
                    {
                        name: "portfolio_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("assets", "FK_ASSETS_PORTFOLIO");
        await queryRunner.dropTable("assets");
    }
}
