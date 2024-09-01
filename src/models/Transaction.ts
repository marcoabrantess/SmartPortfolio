// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { v4 as uuid } from "uuid";

// import { Portfolio } from './Portfolio';
// import { Asset } from './Asset';

// @Entity('transactions')
// export class Transaction {
//     @PrimaryGeneratedColumn('uuid')
//     id!: string;

//     @Column()
//     amount!: number;

//     @Column()
//     type!: string;

//     @Column('decimal')
//     price!: number;

//     @Column('date')
//     date!: Date;

//     @ManyToOne(() => Portfolio, portfolio => portfolio.transactions)
//     portfolio!: Portfolio;

//     @ManyToOne(() => Asset, asset => asset.transactions)
//     asset!: Asset;

//     constructor() {
//         if(!this.id) {
//             this.id = uuid();
//         }
//     }
// }
