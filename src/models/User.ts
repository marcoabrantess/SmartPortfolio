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

    @Column({ type: 'uuid'})
    portfolio_id: string | undefined ;

    @CreateDateColumn()
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
