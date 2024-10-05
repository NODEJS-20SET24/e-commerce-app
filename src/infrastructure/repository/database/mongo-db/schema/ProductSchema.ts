import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class ProductModel {
  @Prop({ type: String, default: uuidv4() })
  _id: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  supplierId: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
export type ProductDocument = HydratedDocument<ProductModel>;
