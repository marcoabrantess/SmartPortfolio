import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from "uuid";
import { Portfolio } from './Portfolio';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', unique: true })
    CPF!: string;

    @Column({ type: 'varchar' })
    name!: string;

    @Column({ type: 'varchar', unique: true })
    login!: string;

    @Column({ type: 'varchar' })
    password!: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: "0.00" // Valor padrão como string decimal
    })
    available_balance!: number

    @Column({ type: 'uuid'})
    portfolio_id: string | undefined ;

    @CreateDateColumn({ type: 'date'})
    created_at!: Date;

    @OneToOne(() => Portfolio, { cascade: true, eager: true })
    @JoinColumn({ name: 'portfolio_id' })
    portfolio!: Portfolio;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    // Método para calcular o valor total investido
    async getTotalInvestedValue(): Promise<number> {
        if (!this.portfolio) {
            throw new Error('Portfolio não encontrado');
        }

        // Calcula o valor total investido
        const assets = this.portfolio.assets;
        const totalInvested = assets.reduce((total, asset) => {
            return total + (asset.currentValue * asset.quantity);
        }, 0);

        return parseFloat(totalInvested.toFixed(2));
    }
}
