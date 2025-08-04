// routes/product.js
import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

// GET all products for dashboard
router.get('/dashboard/all', async (req, res) => {
  try {
    const products = await Product.find({}, { title: 1, image: 1 }); // selected fields
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET product by ID for "Learn More" page
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product); // includes detailedDescription
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
