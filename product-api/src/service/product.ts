import "reflect-metadata";
import { Repository } from 'typeorm';
import Db from '../db';
import Product from '../db/entity/Product';
import ProductDTO from '../dto/product';
import * as productMapper from '../mapper/product';

export default class ProductService {
    static db = new Db();

    static async findById(productId: string): Promise<ProductDTO | void> {
        const repo = await this.getProductRepo();
        const product = await repo.findOne(productId);
        return product ? productMapper.toDTO(product) : undefined;
    }

    static async findAll(): Promise<ProductDTO[]> {
        const repo = await this.getProductRepo();
        console.log(repo);
        const products = await repo.find();
        console.log(products);
        return products.map(productMapper.toDTO);
    }

    static async getProductRepo(): Promise<Repository<Product>> {
        const connection = await this.db.getConnection();
        return connection.getRepository(Product);
    }

    static async createProduct(product: ProductDTO): Promise<void> {
        const productRepo = await this.getProductRepo();
        await productRepo.manager.transaction(async (entityManager) => {
            const model: Product = productRepo.create({ ...product, stock: { count: product.count } });
            await entityManager.save(model);
        });
    }

    static async updateProduct(productId: ProductDTO['id'], product: ProductDTO): Promise<void> {
        const productRepo = await this.getProductRepo();
        await productRepo.manager.transaction(async (entityManager) => {
            const model = await productRepo.findOne(productId);
            Object.assign(model, product);
            await entityManager.save(model);
        });
    }
}