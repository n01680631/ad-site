// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/product.js';
import apiRoutes from './routes/api.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_CONNECTION)
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error(' MongoDB connection error:', err));

// Routes
app.use('/product', productRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
