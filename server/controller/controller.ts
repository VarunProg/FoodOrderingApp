import express, { Request, Response } from "express";
import Order from "../model/ordersModal";
import mongoose from "mongoose";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const getOrderDetails = async (req: Request, res: Response) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error });
    }
  };

  export const createOrder = async (req: Request, res: Response) => {
    const { address, name, phoneNumber, items } = req.body;
    const user = req.user as jwt.JwtPayload;
  
    console.log("Request Body:", req.body); // Log request body
    console.log("User from Request:", user); // Log user from JWT
  
    if (!address || !name || !phoneNumber || !items) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const newOrder = new Order({
        address,
        name,
        phoneNumber,
        items: items.map((item: { name: string; amount: number }) => ({
          ...item,
          _id: new mongoose.Types.ObjectId()
        })),
        userId: user.sub,
        userName: user.name
      });
  
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Error creating order' });
    }
  };

export const deleteOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;
  
    try {
      const deletedOrder = await Order.findByIdAndDelete(orderId);
  
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting order', error });
    }
  };
