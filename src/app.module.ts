import { Module } from '@nestjs/common';
import { ProductController } from './infrastructure/controller/ProductController';
import { ProductService } from './application/service/ProductService';
import { InMemoryProductRepository } from './infrastructure/repository/in-memory/InMemoryProductRepository';
import { ProductRepository } from './domain/repository/ProductRepository';
import { SupplierRepository } from './domain/repository/SupplierRepository';
import { InMemorySupplierRepository } from './infrastructure/repository/in-memory/InMemorySupplierRepository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ProductService,
    InMemoryProductRepository,
    InMemorySupplierRepository,
    {
      provide: ProductRepository,
      useExisting: InMemoryProductRepository,
    },
    {
      provide: SupplierRepository,
      useExisting: InMemorySupplierRepository,
    },
  ],
})
export class AppModule {}
