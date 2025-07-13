import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
        details: err.details || null,
      });
    }
  
    console.error(err);
  
    return res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor',
    });
  }
  
