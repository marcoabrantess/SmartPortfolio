import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from "typeorm";

export class CreateUser1725221317359 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "CPF",
                        type: "char",
                        length: "11",
                        isUnique: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "login",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "password",
                        type: "varchar",
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

        await queryRunner.createIndex(
            "users",
            new TableIndex({
                name: "IDX_USERS_CPF",
                columnNames: ["CPF"]
            })
        );
        
        await queryRunner.createForeignKey(
            "users",
            new TableForeignKey({
                columnNames: ["portfolio_id"],
                referencedTableName: "portfolios",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("users", "FK_PORTFOLIOS_USER");

        await queryRunner.dropIndex("users", "IDX_USERS_CPF");
        await queryRunner.dropTable("users");
    }
}
