import { v4 as uuidv4 } from 'uuid';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '../../../../common/Injectable';
import { Product } from '../../../../domain/entity/Product';
import { ProductRepository } from '../../../../domain/repository/ProductRepository';
import { getDocumentClient } from '../../../../common/aws/Clients';

@Injectable()
export class DynamoProductRepository implements ProductRepository {
  private PRODUCT_TABLE = 'product';
  async create(product: Product): Promise<Product> {
    const documentClient = getDocumentClient();
    const model = {
      ID: uuidv4(),
      name: product.name,
      description: product.description,
      supplierId: product.supplier.id
    };

    const command = new PutCommand({
      TableName: this.PRODUCT_TABLE,
      Item: model
    });

    await documentClient.send(command);
    return this.mapToEntity(model);
  }
  async findById(id: number): Promise<Product> {
    const documentClient = getDocumentClient();
    const command = new QueryCommand({
      TableName: this.PRODUCT_TABLE,
      KeyConditionExpression: 'ID = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    });

    const response = await documentClient.send(command);
    return response?.Items[0] ? this.mapToEntity(response?.Items[0]) : null;
  }

  private mapToEntity(document: any): any {
    return {
      id: 0,
      idDynamo: document.ID,
      name: document.name,
      description: document.description,
      supplierId: document.supplierId
    };
  }
}
