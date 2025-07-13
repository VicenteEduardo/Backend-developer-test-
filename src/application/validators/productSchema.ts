import { z } from 'zod';

/**
 * Schema para criação de produtos
 */
export const createProductSchema = z.object({
  name: z.string().min(2, 'Nome do produto é obrigatório e deve ter no mínimo 2 caracteres'),
  price: z.number().positive('O preço deve ser um número positivo'),
  description: z.string().min(5, 'Descrição deve ter no mínimo 5 caracteres'),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;

/**
 * Schema para atualização de produtos (todos os campos opcionais)
 */
export const updateProductSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').optional(),
  price: z.number().positive('Preço deve ser um número positivo').optional(),
  description: z.string().min(5, 'Descrição deve ter no mínimo 5 caracteres').optional(),
});

export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
