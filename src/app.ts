
import express from 'express';
import productRoutes from './presentation/routes/ProductRoutes';
import { errorHandler } from './shared/errors/errorHandler';
import { AppError } from './shared/errors/AppError';
import authRoutes from './presentation/routes/AuthRoutes';
import { setupSwagger } from './docs/swagger';
import dotenv from 'dotenv';
const app = express();

dotenv.config();
app.use(express.json());
app.use('/products', productRoutes);
app.use('/auth', authRoutes);
setupSwagger(app);
app.use((req, res, next) => {
  // Lça erro personalizado de rota não encontrada
  next(new AppError(`Rota ${req.method} ${req.originalUrl} não encontrada`, 404));
});

// Middleware global de tratamento de erros
app.use(errorHandler);

export default app;
