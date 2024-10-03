import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './model/ProductModel';
import { SupplierModel } from './model/SupplierModel';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'e-commerce-db.cdogwoim81ke.us-east-2.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'Admin12%',
      database: 'ecommercedb',
      entities: [ProductModel, SupplierModel],
      synchronize: true, //solo para dev
      autoLoadEntities: true,
      ssl: { rejectUnauthorized: false }
    }),
    TypeOrmModule.forFeature([ProductModel, SupplierModel])
  ],
  exports: [TypeOrmModule]
})
export class PostgresModule {}
