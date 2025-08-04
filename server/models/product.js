// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  detailedDescription: String,
  image: String,
  category: String,
  priceRange: String,
  rating: Number,
  available: Boolean,
  validUntil: Date,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
