import { Module } from '@nestjs/common';
import { ProductController } from './infrastructure/controller/ProductController';
import { ProductService } from './application/service/ProductService';
// import { InMemoryProductRepository } from './infrastructure/repository/in-memory/InMemoryProductRepository';
import { ProductRepository } from './domain/repository/ProductRepository';
import { SupplierRepository } from './domain/repository/SupplierRepository';
import { InMemorySupplierRepository } from './infrastructure/repository/database/in-memory/InMemorySupplierRepository';
import { DynamoProductRepository } from './infrastructure/repository/database/dynamo-db/DynamoProductRepository';
import { MongoModule } from './infrastructure/repository/database/mongo-db/mongo.module';
import { PostgresModule } from './infrastructure/repository/database/postgres/postgres.module';
import { MongoProductRepository } from './infrastructure/repository/database/mongo-db/MongoProductRepository';
import { CacheController } from './infrastructure/controller/CacheController';
import { RedisCacheRepository } from './infrastructure/repository/cache/RedisCacheRepository';
import { CacheRepository } from './domain/repository/CacheRepository';
import { CacheService } from './application/service/CacheService';
// import { PostgresProductRepository } from './infrastructure/repository/postgres/PostgresProductRepository';
// import { PostgresSupplierRepository } from './infrastructure/repository/postgres/PostgresSupplierRepository';

@Module({
  imports: [
    // PostgresModule,
    MongoModule
  ],
  controllers: [ProductController, CacheController],
  providers: [
    ProductService,
    CacheService,
    // InMemoryProductRepository,
    InMemorySupplierRepository,
    // PostgresProductRepository,
    // PostgresSupplierRepository,
    MongoProductRepository,
    RedisCacheRepository,
    {
      provide: ProductRepository,
      useExisting: MongoProductRepository
    },
    {
      provide: SupplierRepository,
      useExisting: InMemorySupplierRepository
    },
    {
      provide: CacheRepository,
      useExisting: RedisCacheRepository
    }
  ]
})
export class AppModule {}
