import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';

const config = {
  credentials: {
    accessKeyId: '<YOUR_ACCESS_KEY>',
    secretAccessKey: '<YOUR_SECRET_KEY>'
  },
  region: 'us-east-2'
};

export function getDocumentClient(): DynamoDBClient {
  return new DynamoDBClient(config);
}

export function getS3Client(): S3Client {
  return new S3Client(config);
}
