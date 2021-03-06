import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import ProductService from '../service/product';

import { MessageUtil } from '../utils/message';

export default class ProductController {

    async findById(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try {
            const productId: string = event.pathParameters.id;
            const item = await ProductService.findById(productId);
            return item ? MessageUtil.success(item) : MessageUtil.error404('product does not exist');
        } catch (err) {
            return MessageUtil.error500(err);
        }
    }

    async findAll(): Promise<APIGatewayProxyResult> {
        try {
            const items = await ProductService.findAll();
            return MessageUtil.success(items);
        } catch (err) {
            return MessageUtil.error500(err);
        }
    }
}