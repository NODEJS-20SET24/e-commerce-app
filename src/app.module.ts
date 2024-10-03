import { Module } from '@nestjs/common';
import { ProductController } from './infrastructure/controller/ProductController';
import { ProductService } from './application/service/ProductService';
// import { InMemoryProductRepository } from './infrastructure/repository/in-memory/InMemoryProductRepository';
import { InMemorySupplierRepository } from './infrastructure/repository/in-memory/InMemorySupplierRepository';
import { ProductRepository } from './domain/repository/ProductRepository';
import { SupplierRepository } from './domain/repository/SupplierRepository';
import { PostgresModule } from './infrastructure/repository/postgres/postgres.module';
// import { PostgresProductRepository } from './infrastructure/repository/postgres/PostgresProductRepository';
// import { PostgresSupplierRepository } from './infrastructure/repository/postgres/PostgresSupplierRepository';
import { DynamoProductRepository } from './infrastructure/repository/dynamo-db/DynamoProductRepository';

@Module({
  // imports: [PostgresModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    // InMemoryProductRepository,
    InMemorySupplierRepository,
    // PostgresProductRepository,
    // PostgresSupplierRepository,
    DynamoProductRepository,
    {
      provide: ProductRepository,
      useExisting: DynamoProductRepository
    },
    {
      provide: SupplierRepository,
      useExisting: InMemorySupplierRepository
    }
  ]
})
export class AppModule {}
