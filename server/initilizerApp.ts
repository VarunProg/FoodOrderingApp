import { ConnectOptions } from 'mongoose';
import foodModal from './model/ordersModal';
import mongoose from 'mongoose';
import orderDetails from './data/orderDetails';

const hasOrderData = async () => {
  const count = await foodModal.countDocuments({});
  return count > 0;
};

const saveOrder = async () => {
  try {
    // Save each data to the database
    for (const order of orderDetails) {
      const orderInstance = new foodModal(order);
      await orderInstance.save();
    }

    console.log('Elevators saved successfully!');
  } catch (error) {
    console.error('Error saving elevators:', error);
  } finally {
    mongoose.disconnect();
  }
};

export const initializeApp = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error("MONGO_URI is not defined in your environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    // Check if data already exists before saving
    const dataExists = await hasOrderData();
    if (!dataExists) {
      await saveOrder();
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};