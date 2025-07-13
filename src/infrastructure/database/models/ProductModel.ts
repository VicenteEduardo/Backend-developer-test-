import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

export const ProductModel = model('Product', productSchema);
