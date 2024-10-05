import { Cache } from '../entity/Cache';

export abstract class CacheRepository {
  abstract create(key: string, value: object): Promise<void>;
  abstract findByKey(key: string): Promise<Cache>;
}
