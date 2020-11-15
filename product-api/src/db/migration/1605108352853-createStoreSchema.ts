import "reflect-metadata";
import { MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createStoreSchema1605108352853 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const productTable = new Table({
            name: 'product',
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isUnique: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 6,
                    scale: 2,
                    isNullable: false,
                    default: 0.00,
                },
                {
                    name: 'updatedAt',
                    type: 'timestamptz',
                    default: 'NOW()'
                },
                {
                    name: 'createdAt',
                    type: 'timestamptz',
                    default: 'NOW()'
                }
            ],
        });
        const stockTable = new Table({
            name: 'stock',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: 'count',
                    type: 'int',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'productId',
                    type: 'uuid'
                },
            ],
        });
        const stockTableFK = new TableForeignKey({
            columnNames: ['productId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await queryRunner.createTable(productTable, true);
        await queryRunner.createTable(stockTable, true);
        await queryRunner.createForeignKey("stock", stockTableFK);
        await queryRunner.query(`
        CREATE OR REPLACE FUNCTION trigger_set_timestamp()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        `);
        await queryRunner.query(`
        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON product
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('stock');
        await queryRunner.dropTable('product');
    }
}
