import { z } from 'zod';
export const loginAuthSchema = z.object({
  email: z.string().min(2, 'o campo email é obrigatorio'),
  password: z.string().min(8, 'o campo password é obrigatorio deve ter no minimo 8 letras'),
});



export type AuthSchemaDTO = z.infer<typeof loginAuthSchema>;


export const RegisterAuthSchema = z.object({
  email: z.string().min(2, 'o campo email é obrigatorio'),
  password: z.string().min(8, 'o campo password é obrigatorio deve ter no minimo 8 letras'),
  name: z.string().min(2, 'o campo password é obrigatorio'),
});

export type RegisterAuthSchemaSchemaDTO = z.infer<typeof RegisterAuthSchema>;
