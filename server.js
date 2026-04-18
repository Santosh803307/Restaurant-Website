require('dotenv').config();
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { json as _json } from 'body-parser';
import orderRoutes from './routes/orders';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(_json());

// Connect to MongoDB
connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB error:", err));

// Routes
app.use(json()); // IMPORTANT
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Restaurant Backend is Running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${5000}`);
});