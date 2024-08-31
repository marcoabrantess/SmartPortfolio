import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { v4 as uuid } from "uuid";

import { User } from './User';
import { Asset } from './Asset';
import { Transaction } from './Transaction';

@Entity()
export class Portfolio {
    @PrimaryGeneratedColumn()
    id!: string;

    @OneToOne(() => User, user => user.portfolio)
    user!: User;

    @OneToMany(() => Asset, asset => asset.portfolio)
    assets!: Asset[];

    @OneToMany(() => Transaction, transaction => transaction.portfolio)
    transactions!: Transaction[];

    constructor() {
        if(!this.id) {
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
