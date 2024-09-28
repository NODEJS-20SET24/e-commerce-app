import { Supplier } from '../entity/Supplier';

export abstract class SupplierRepository {
  abstract findById(id: number): Promise<Supplier>;
}
