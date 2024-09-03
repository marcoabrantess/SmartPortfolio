/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { v4 as uuid } from "uuid";

import { Portfolio } from './Portfolio';
// import { Transaction } from './Transaction';

@Entity('assets')
export class Asset {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar' })
    code!: string;

    @Column({ name: 'current_value', type: 'decimal' })
    currentValue!: number;

    @Column({ type: 'varchar' })
    name!: string;

    @Column({ type: 'decimal' })
    yield!: number;

    @Column({ type: 'integer' })
    quantity!: number;

    @Column({ type: 'uuid'})
    portfolio_id: string | undefined ;

    @ManyToOne(() => Portfolio, (portfolio) => portfolio.assets)
    @JoinColumn({ name: 'portfolio_id' })
    portfolio!: Portfolio;

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
