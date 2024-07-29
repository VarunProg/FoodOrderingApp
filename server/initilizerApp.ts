import mongoose from 'mongoose';
import Order from './model/ordersModal';  
import orderDetails from './data/orderDetails';  

const hasOrderData = async () => {
  try {
    const count = await Order.countDocuments({});
    return count > 0;
  } catch (error) {
    console.error('Error checking if order data exists:', error);
    return false;
  }
};

const saveOrder = async () => {
  try {
    for (const order of orderDetails) {
      const orderInstance = new Order(order);
      await orderInstance.save();
    }
    console.log('Order data saved successfully!'); 
  } catch (error) {
    console.error('Error saving order data:', error);
  }
};

export const initializeApp = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('MONGO_URI is not defined in your environment variables.');
    process.exit(1);
  }

  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully.');

    const dataExists = await hasOrderData();
    if (!dataExists) {
      await saveOrder();
    }
  } catch (error) {
    console.error('Error connecting to MongoDB or initializing data:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};
