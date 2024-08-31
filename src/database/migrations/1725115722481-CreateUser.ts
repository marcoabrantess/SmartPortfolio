import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from "typeorm";

export class CreateUserAndPortfolio1682445370000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criação da tabela users
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
                name: "IDX_USERS_LOGIN",
                columnNames: ["login"]
            })
        );

        await queryRunner.createIndex(
            "users",
            new TableIndex({
                name: "IDX_USERS_CPF",
                columnNames: ["CPF"]
            })
        );

        // Criação da tabela portfolios
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

        // Criação da tabela assets
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("assets", "FK_ASSETS_PORTFOLIO");
        await queryRunner.dropTable("assets");
        
        await queryRunner.dropForeignKey("portfolios", "FK_PORTFOLIOS_USER");
        await queryRunner.dropTable("portfolios");

        await queryRunner.dropIndex("users", "IDX_USERS_LOGIN");
        await queryRunner.dropIndex("users", "IDX_USERS_CPF");
        await queryRunner.dropTable("users");
    }
}
