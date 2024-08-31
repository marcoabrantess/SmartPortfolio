import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from "uuid";

// import * as bcrypt from 'bcryptjs';

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

    @CreateDateColumn()
    created_at!: Date;

    // Hook to hash the password before inserting it into the database
    // @BeforeInsert()
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 10);
    // }

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}
