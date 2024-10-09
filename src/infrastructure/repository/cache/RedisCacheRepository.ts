import Redis from 'ioredis';
import { Injectable } from '../../../common/Injectable';
import { Cache } from '../../../domain/entity/Cache';
import { CacheRepository } from '../../../domain/repository/CacheRepository';

@Injectable()
export class RedisCacheRepository implements CacheRepository {
  async create(key: string, value: object): Promise<void> {
    const client = this.getClient();
    await client.set(key, JSON.stringify(value));
    client.disconnect();
  }
  async findByKey(key: string): Promise<Cache> {
    const client = this.getClient();
    const value = await client.get(key);
    client.disconnect();
    return {
      key,
      value: JSON.parse(value)
    };
  }

  private getClient(): Redis {
    return new Redis({
      port: 6379,
      host: 'localhost'
    });
  }
}
