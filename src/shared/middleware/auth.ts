import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { env } from '../../config/env';

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError('Token não fornecido', 401);

  const [, token] = authHeader.split(' ');
  if (!token) throw new AppError('Token mal formatado', 401);
  
  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    (req as any).user = decoded;
    next();
  } catch (err) {
    throw new AppError('Token inválido', 401);
  }
}
