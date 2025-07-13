import { Request, Response } from 'express';
import { AuthService } from '../../application/services/AuthService';
import { loginAuthSchema, RegisterAuthSchema } from '../../application/validators/AuthSchema';
import { AppError } from '../../shared/errors/AppError';

export class AuthController {
  constructor(private service: AuthService) {}

  async register(req: Request, res: Response) {
    const resultData = RegisterAuthSchema.safeParse(req.body);

    if (!resultData.success) {
      const errorDetails = resultData.error.issues.map(issue => ({
        path: issue.path,
        message: issue.message,
      }));

      throw new AppError(
        'Erro de validação',
        400,
        errorDetails
      );
    }

    const result = await this.service.register(req.body);
    return res.status(201).json(result);
  }

  async login(req: Request, res: Response) {
    const resultData = loginAuthSchema.safeParse(req.body);

    if (!resultData.success) {
      const errorDetails = resultData.error.issues.map(issue => ({
        path: issue.path,
        message: issue.message,
      }));

      throw new AppError(
        'Erro de validação',
        400,
        errorDetails
      );
    }

    const result = await this.service.login(req.body);
    return res.status(200).json(result);
  }

 
}
