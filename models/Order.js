import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new Schema({
  items: [orderItemSchema],
  total: { type: Number, required: true },
  phone: { type: String, required: true },   // customer phone from frontend
  razorpayOrderId: { type: String, default: null },
  razorpayPaymentId: { type: String, default: null },
  status: { type: String, default: 'Pending' }, // Pending, Paid, Delivered
  createdAt: { type: Date, default: Date.now }
});

export default model('Order', orderSchema);