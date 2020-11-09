import productList from './products.json';

export interface Product {
    count: number,
    description: string,
    id: string,
    price: number,
    title: string
}

const products: Product[] = productList;

export default products;