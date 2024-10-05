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
import { InMemoryProductRepository } from './infrastructure/repository/database/in-memory/InMemoryProductRepository';
import { S3MetadataRespository } from './infrastructure/repository/database/s3/S3MetadataRespository';
import { MetadataRepository } from './domain/repository/MetadataRepository';
// import { PostgresProductRepository } from './infrastructure/repository/postgres/PostgresProductRepository';
// import { PostgresSupplierRepository } from './infrastructure/repository/postgres/PostgresSupplierRepository';

@Module({
  imports: [
    // PostgresModule,
    // MongoModule
  ],
  controllers: [ProductController, CacheController],
  providers: [
    ProductService,
    CacheService,
    InMemoryProductRepository,
    InMemorySupplierRepository,
    // PostgresProductRepository,
    // PostgresSupplierRepository,
    // MongoProductRepository,
    RedisCacheRepository,
    S3MetadataRespository,
    {
      provide: ProductRepository,
      useExisting: InMemoryProductRepository
    },
    {
      provide: SupplierRepository,
      useExisting: InMemorySupplierRepository
    },
    {
      provide: CacheRepository,
      useExisting: RedisCacheRepository
    },
    {
      provide: MetadataRepository,
      useExisting: S3MetadataRespository
    }
  ]
})
export class AppModule {}
