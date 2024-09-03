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
}
