import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { v4 as uuid } from "uuid";

import { Portfolio } from './Portfolio';
import { Transaction } from './Transaction';

@Entity()
export class Asset {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    code!: string;

    @Column('decimal')
    currentValue!: number;

    @Column()
    name!: string;

    @Column('decimal')
    yield!: number;

    @ManyToOne(() => Portfolio, portfolio => portfolio.assets)
    portfolio!: Portfolio;

    @OneToMany(() => Transaction, transaction => transaction.asset)
    transactions!: Transaction[];

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

    getAveragePurchasePrice(): number {
        // Implementar cálculo do preço médio de compra
        return 0;
    }

    getQuantity(): number {
        // Implementar retorno da quantidade de ações compradas
        return 0;
    }

    getTotalValue(): number {
        // Implementar cálculo do valor total baseado na quantidade e no valor atual

        return 0;
    }
}
