import "reflect-metadata";
import "source-map-support/register";
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import Product from "./Product";

  @Entity()
  export default class Stock {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    count: number;
  
    @OneToOne(() => Product, product => product.stock)
    @JoinColumn()
    product: Product;
  }

  export interface StockModel {
    id: number;
    count: number;
  }