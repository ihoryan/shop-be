import "reflect-metadata";
import Product from '../db/entity/Product';
export const toModel = ({ title, description, price }: Product) => ({ title, description, price });
export const toDTO = ({ id, title, description, price, stock }: Product) => ({
    id,
    title,
    description,
    price,
    count: stock.count
});