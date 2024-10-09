import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '../../../../common/Injectable';
import { Repository } from 'typeorm';
import { SupplierRepository } from '../../../../domain/repository/SupplierRepository';
import { SupplierModel } from './model/SupplierModel';
import { Supplier } from '../../../../domain/entity/Supplier';

@Injectable()
export class PostgresSupplierRepository implements SupplierRepository {
  constructor(
    @InjectRepository(SupplierModel)
    private supplierRepository: Repository<SupplierModel>
  ) {}
  findById(id: number): Promise<Supplier> {
    return this.supplierRepository.findOneBy({ id });
  }
}
