import "reflect-metadata";
import { Connection, ConnectionManager, createConnection, getConnectionManager, ConnectionOptions } from "typeorm";
import Product from './entity/Product';
import Stock from './entity/Stock';
require('dotenv').config();
export default class Database {
    private connectionManager: ConnectionManager;

    constructor() {
        this.connectionManager = getConnectionManager();
    }

    public async getConnection(): Promise<Connection> {
        let connection: Connection = this.connectionManager.connections.length ? this.connectionManager.get() : null;

        if (!connection) {
            connection = await createConnection({
                type: "postgres",
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                synchronize: false,
                logging: true,
                entities: [Stock, Product]
            } as unknown as ConnectionOptions);
        }

        if (connection && !connection.isConnected) {
            connection = await connection.connect();
        }
        return connection;
    }
}