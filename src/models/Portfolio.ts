/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Asset } from './Asset';

@Entity('portfolios')
export class Portfolio {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToMany(() => Asset, (asset) => asset.portfolio) // Estabelece a relação com Asset
    assets!: Asset[];

    // @OneToMany(() => Transaction, transaction => transaction.portfolio)
    // transactions!: Transaction[];

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    getTotalYield(): number {
        // Implementar cálculo do rendimento total
        return 0;
    }

    getAccumulateBalance(): number {
        // Implementar cálculo do saldo acumulado
        return 0;
    }

    getAssetDistribution(): unknown {
        // Implementar distribuição das ações para gráfico de pizza
        return {};
    }
}
