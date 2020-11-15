import "reflect-metadata";
import "source-map-support/register";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Stock from './Stock';

@Entity()
export default class Product {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ nullable: false })
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt?: Date;

    @OneToOne(() => Stock, stock => stock.product, { eager: true, cascade: true })
    stock?: Stock;
}