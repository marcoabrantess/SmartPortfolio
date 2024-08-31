import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUser1725115722481 implements MigrationInterface {

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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("users", "IDX_USERS_LOGIN");
        await queryRunner.dropIndex("users", "IDX_USERS_CPF");
        await queryRunner.dropTable("users");
    }
}
