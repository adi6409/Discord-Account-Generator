import { AccountType } from "../enums/AccountType";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: AccountType })
    category: string;

    @Column({ type: 'tinyint', default: 0 })
    active: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}