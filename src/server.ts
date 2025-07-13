import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3333;
const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/products-db';


const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🟢 MongoDB connected');

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

start();
