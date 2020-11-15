import "reflect-metadata";
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import BooksController from './controller/product';
const booksController = new BooksController();

export const getProductsById: APIGatewayProxyHandler = booksController.findById;
export const getProductsList: APIGatewayProxyHandler = booksController.findAll;
export const test: APIGatewayProxyHandler = booksController.test;