import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';

export class ProductService {
  constructor(private repository: IProductRepository) {}

  async create(product: Product): Promise<Product> {
    return this.repository.create(product);
  }

  async list(): Promise<Product[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<Product | null> {
    return this.repository.findById(id);
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
