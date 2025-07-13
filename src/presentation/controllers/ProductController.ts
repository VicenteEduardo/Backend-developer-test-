import { Request, Response } from 'express';
import { ProductService } from '../../application/services/ProductService';
import { Product } from '../../domain/entities/Product';
import { createProductSchema, updateProductSchema } from '../../application/validators/productSchema';
import { AppError } from '../../shared/errors/AppError';




export class ProductController {
  constructor(private service: ProductService) {}

  async create(req: Request, res: Response) {
    const result = createProductSchema.safeParse(req.body);

    if (!result.success) {
        const errorDetails = result.error.issues.map(issue => ({
          path: issue.path,
          message: issue.message,
        }));
      
        // Use o AppError para retornar a estrutura com detalhes
        throw new AppError(
          'Erro de validação',
          400,
          errorDetails // Aqui vai o array com os erros
        );
      }
      

    const { name, price, description } = result.data;
    const product = new Product('', name, price, description);
    const created = await this.service.create(product);
    return res.status(201).json(created);
  }

 


  async list(req: Request, res: Response) {
    const products = await this.service.list();
    return res.json(products);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const result = updateProductSchema.safeParse(req.body);

    if (!result.success) {
      const errorDetails = result.error.issues.map(issue => ({
        path: issue.path,
        message: issue.message,
      }));
      throw new AppError('Erro de validação', 400, errorDetails);
    }

    const updated = await this.service.update(id, result.data);
    if (!updated) {
      throw new AppError('Produto não encontrado', 404);
    }
    return res.json(updated);
  }

  async getById(req: Request, res: Response) {
    const { id, field } = req.params;
  
    if (!id) {
      throw new AppError("ID do produto não fornecido", 400);
    }
  
    const product = await this.service.getById(id);
  
    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }
  
    if (typeof field === 'undefined') {
      return res.json(product);
    }
  
    if (!(field in product)) {
      throw new AppError(`Campo '${field}' não encontrado no produto`, 400);
    }
  
    return res.json({ [field]: (product as any)[field] });
  }
  
  async delete(req: Request, res: Response) {
    const { id, field } = req.params;
  
    if (!id) {
      throw new AppError("ID do produto não fornecido", 400);
    }
    const product = await this.service.getById(id);
  
    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }
  
    // Executa a exclusão
    await this.service.delete(id);
  
  
    if (field) {
      if (!(field in product)) {
        throw new AppError(`Campo '${field}' não encontrado no produto`, 400);
      }
      return res.json({ [field]: (product as any)[field] });
    }
  
    return res.json({ message: "Produto deletado com sucesso" });
  }
  
  
}
