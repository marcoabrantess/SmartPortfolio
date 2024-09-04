import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddAvailableBalanceToUser1725360522585 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "available_balance",
                type: "decimal",
                precision: 10, // Número total de dígitos, ajuste conforme necessário
                scale: 2,      // Número de dígitos à direita do ponto decimal, ajuste conforme necessário
                default: 0,    // Valor padrão para a nova coluna
                isNullable: false,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "availableBalance");
    }

}
