import express from "express";
import { createOrder, deleteOrder, getOrderDetails } from "../controller/controller";


const router = express.Router();


router.get('/order', getOrderDetails);
router.post('/createOrder', createOrder);
router.delete('/orders/:orderId', deleteOrder);


export default router;