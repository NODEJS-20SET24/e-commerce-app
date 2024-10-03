import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable } from 'src/common/Injectable';
import { Product } from 'src/domain/entity/Product';
import { ProductRepository } from 'src/domain/repository/ProductRepository';

@Injectable()
export class DynamoProductRepository implements ProductRepository {
  private PRODUCT_TABLE = 'product';
  async create(product: Product): Promise<Product> {
    const documentClient = this.getDocumentClient();
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
    const documentClient = this.getDocumentClient();
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

  private getDocumentClient(): DynamoDBClient {
    const config = {
      credentials: {
        accessKeyId: '<YOUR_ACCESS_KEY>',
        secretAccessKey: '<YOUR_SECRET_KEY>'
      },
      region: 'us-east-2'
    };
    return new DynamoDBClient(config);
  }
}
