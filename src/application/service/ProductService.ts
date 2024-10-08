import { ProductRepository } from '../../domain/repository/ProductRepository';
import { SupplierRepository } from '../../domain/repository/SupplierRepository';
import { CreateProductDto } from '../dto/CreateProductDto';
import { Product } from '../../domain/entity/Product';
import { Injectable } from '../../common/Injectable';
import { CustomException } from '../../common/CustomException';
import { MetadataRepository } from '../../domain/repository/MetadataRepository';
import { MailerRepository } from '../../domain/repository/MailerRepository';
import { Mail } from '../../domain/entity/Mail';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly supplierRepository: SupplierRepository,
    private readonly metadataRepository: MetadataRepository,
    private readonly mailerRepository: MailerRepository
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product = new Product();
    const supplier = await this.supplierRepository.findById(dto.supplierId);

    if (!supplier)
      throw new CustomException(404, 'Not Found', {
        message: [`Supplier with id ${dto.supplierId} does not exists`]
      });

    product.name = dto.name;
    product.description = dto.description;
    product.supplier = supplier;

    const newProduct = await this.productRepository.create(product);
    await this.mailerRepository.sendEmail(this.getEmailDetails(newProduct));
    await this.metadataRepository.upload(newProduct.id, newProduct.name);

    return newProduct;
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product)
      throw new CustomException(404, 'Not Found', {
        message: [`Product with id ${id} does not exists`]
      });
    return product;
  }

  private getEmailDetails(product: Product): Mail {
    return {
      from: 'test@test.com',
      to: 'example@example.com',
      subject: 'Product created',
      body: `Código producto: ${product.id}, Nombre producto: ${product.name}`
    };
  }
}
