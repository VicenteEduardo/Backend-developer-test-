import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { ProductModel } from '../models/ProductModel';
import { Product } from '../../../domain/entities/Product';

export class ProductRepository implements IProductRepository {
  async create(product: Product): Promise<Product> {
    const created = await ProductModel.create(product);
    return new Product(created.id, created.name, created.price, created.description);
  }

  async findAll(): Promise<Product[]> {
    const docs = await ProductModel.find();
    return docs.map(doc => new Product(doc.id, doc.name, doc.price, doc.description));
  }

  async findById(id: string): Promise<Product | null> {
    const doc = await ProductModel.findById(id);
    return doc ? new Product(doc.id, doc.name, doc.price, doc.description) : null;
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    const doc = await ProductModel.findByIdAndUpdate(id, data, { new: true });
    return doc ? new Product(doc.id, doc.name, doc.price, doc.description) : null;
  }

  async delete(id: string): Promise<void> {
    await ProductModel.findByIdAndDelete(id);
  }
}
