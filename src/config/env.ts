import dotenv from 'dotenv';
dotenv.config();

export const env = {
  mongoUrl: process.env.MONGO_URL || (() => { throw new Error('MONGO_URL não definida'); })(),
  jwtSecret: process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET não definida'); })(),
  port: process.env.PORT || 3333
};
