import { Router } from 'express';
const router = Router();
import { createOrder, verifyPayment, saveOrder, getOrdersByPhone } from '../controllers/orderController';

router.post('/create-order', createOrder);      
router.post('/verify-payment', verifyPayment);  
router.post('/save-order', saveOrder);         
router.get('/history/:phone', getOrdersByPhone); 

export default router;