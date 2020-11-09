import productList, { Product } from '../data/productList';

export default interface Model {
    findById():Promise<any>,
    findAll():Promise<any>,
}

export default class ProductService implements Model {
    static async findById(productId:string): Promise<Product|void> {
        return productList.find(({ id }) => productId === id);
    }
    static async findAll(): Promise<Product[]> {
        return productList;
    }
}