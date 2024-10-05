import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from './schema/ProductSchema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:<YOUR_PASSWORD>@tecylabs.2kyjc.mongodb.net/?retryWrites=true&w=majority&appName=TecyLabs'
    ),
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema }
    ])
  ],
  exports: [MongooseModule]
})
export class MongoModule {}
