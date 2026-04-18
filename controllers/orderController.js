import Razorpay from 'razorpay';
import { createHmac } from 'crypto';
import Order from '../models/Order';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});


export async function createOrder(req, res) {
  try {
    const { amount } = req.body; 
    const options = {
      amount: amount * 100, 
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export function verifyPayment(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Invalid signature' });
  }
}


export async function saveOrder(req, res) {
  try {
    const { items, total, phone, razorpayOrderId, razorpayPaymentId } = req.body;
    const newOrder = new Order({
      items,
      total,
      phone,
      razorpayOrderId,
      razorpayPaymentId,
      status: 'Paid'
    });
    await newOrder.save();
    res.status(201).json({ message: 'Order saved successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function getOrdersByPhone(req, res) {
  try {
    const { phone } = req.params;
    const orders = await Order.find({ phone }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}