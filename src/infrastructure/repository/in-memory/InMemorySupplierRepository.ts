import { Injectable } from 'src/common/Injectable';
import { Supplier } from 'src/domain/entity/Supplier';
import { SupplierRepository } from 'src/domain/repository/SupplierRepository';

@Injectable()
export class InMemorySupplierRepository implements SupplierRepository {
  private suppliers: Supplier[] = [{ id: 1, name: 'Proveedor 1', address: '' }];

  async findById(id: number): Promise<Supplier> {
    const supplier = this.suppliers.find((supplier) => supplier.id == id);
    return supplier ? supplier : null;
  }
}
