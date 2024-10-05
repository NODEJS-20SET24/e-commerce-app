import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './model/ProductModel';
import { SupplierModel } from './model/SupplierModel';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '<HOST>',
      port: 5432,
      username: '<USERNAME>',
      password: '<PASSWORD>',
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
