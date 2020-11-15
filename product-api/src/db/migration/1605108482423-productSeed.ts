import "reflect-metadata";
import { MigrationInterface, QueryRunner } from "typeorm";
import Product from '../entity/Product';
import Stock from '../entity/Stock';
// I tried export this data from .json file, but it didn't work for some reason
const products = [
    {
      "count": 4,
      "description": "Short Product Description1",
      "price": 2.4,
      "title": "ProductOne"
    },
    {
      "count": 6,
      "description": "Short Product Description3",
      "price": 10,
      "title": "ProductNew"
    },
    {
      "count": 7,
      "description": "Short Product Description2",
      "price": 23,
      "title": "ProductTop"
    },
    {
      "count": 12,
      "description": "Short Product Description7",
      "price": 15,
      "title": "ProductTitle"
    },
    {
      "count": 7,
      "description": "Short Product Description2",
      "price": 23,
      "title": "Product"
    },
    {
      "count": 8,
      "description": "Short Product Description4",
      "price": 15,
      "title": "ProductTest"
    },
    {
      "count": 2,
      "description": "Short Product Descriptio1",
      "price": 23,
      "title": "Product2"
    },
    {
      "count": 3,
      "description": "Short Product Description7",
      "price": 15,
      "title": "ProductName"
    }
  ];

export class productSeed1605108482423 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const p of products) {
            const product = { ...new Product(), ...p };
            const stock = { ...new Stock(), count: p.count, product };
            await queryRunner.manager.save(Product, product)
            await queryRunner.manager.save(Stock, stock);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('stock');
        await queryRunner.dropTable('product');
    }

}
