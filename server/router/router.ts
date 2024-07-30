import express from "express";
import { createOrder, deleteOrder, getOrderDetails } from "../controller/controller";


const router = express.Router();


router.get('/orders', getOrderDetails);
router.post('/orders', createOrder);
router.delete('/orders/:orderId', deleteOrder);



export default router;