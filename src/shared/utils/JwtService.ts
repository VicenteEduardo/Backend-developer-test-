import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

export class JwtService {
  generateAccessToken(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '15m' });
  }

  generateRefreshToken(payload: object): string {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
  }

  verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    } catch {
      throw new AppError('Token de refresh inválido ou expirado', 401);
    }
  }
}