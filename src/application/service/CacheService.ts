import { CustomException } from 'src/common/CustomException';
import { Injectable } from 'src/common/Injectable';
import { CacheRepository } from 'src/domain/repository/CacheRepository';

@Injectable()
export class CacheService {
  constructor(private readonly cacheRepository: CacheRepository) {}

  async create(key: string, value: object): Promise<object> {
    try {
      await this.cacheRepository.create(key, value);
      return {
        message: '¡Cache stored!'
      };
    } catch (error) {
      throw new CustomException(500, 'Internal Error', {
        message: [error.message]
      });
    }
  }

  async findByKey(key: string): Promise<object> {
    try {
      const response = await this.cacheRepository.findByKey(key);
      if (!response)
        throw new CustomException(404, 'Not found', {
          message: [`Cache with key "${key}" does not exists`]
        });
      return response;
    } catch (error) {
      throw new CustomException(500, 'Internal Error', {
        message: [error.message]
      });
    }
  }
}
