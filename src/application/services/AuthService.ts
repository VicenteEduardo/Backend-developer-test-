
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../../infrastructure/database/models/UserModel';
import { CreateUserDTO } from 'dtos/CreateUserDTO'; 
import { LoginUserDTO } from 'dtos/LoginUserDTO'; 
import { AppError } from '../../shared/errors/AppError';
import { JwtService } from '../../shared/utils/JwtService';


const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthService {
    private jwt = new JwtService();
  async register(data: CreateUserDTO) {
    const existing = await UserModel.findOne({ email: data.email });
    if (existing) throw new AppError('Email já registrado', 400);

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await UserModel.create({ ...data, password: hashed });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(data: LoginUserDTO) {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) throw new AppError('Credenciais inválidas', 401);

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new AppError('Credenciais inválidas', 401);

    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
  async refreshToken(token: string) {
    const payload = this.jwt.verifyRefreshToken(token);
    const accessToken = this.jwt.generateAccessToken({ id: payload.id });
    const refreshToken = this.jwt.generateRefreshToken({ id: payload.id });
    return { accessToken, refreshToken };
  }
}
