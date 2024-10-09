import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '../../../../common/aws/Clients';
import { MetadataRepository } from '../../../../domain/repository/MetadataRepository';
import fs from 'fs';

export class S3MetadataRespository implements MetadataRepository {
  async upload(id: number, name: string): Promise<void> {
    const client = getS3Client();
    // const fileName = `${id}.txt`;
    // fs.writeFileSync(fileName, `name: ${name}`, (error) => {
    //   if (error) throw error;
    //   console.log('File created!');
    // });

    // const content = fs.readFileSync(fileName);

    const command = new PutObjectCommand({
      Bucket: '<YOUR_BUCKET_NAME>',
      Key: `${id}.txt`,
      Body: `name: ${name}`
    });

    try {
      await client.send(command);
      console.log('Object upload to buscket OK');
    } catch (error) {
      console.log(error);
    }
  }
}
