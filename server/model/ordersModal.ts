import mongoose, { Document, Schema } from 'mongoose';

export interface Items {
  _id?: mongoose.Types.ObjectId;
  name: string;
  amount: number;
}

export interface OrderDetails {
  _id?: mongoose.Types.ObjectId;
  address: string;
  name: string;
  phoneNumber: string;
  items: Items[];
  userId: string;  
  userName: string;  
}

const itemSchema = new Schema<Items>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

const orderDetailsSchema = new Schema<OrderModel>({
  address: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  items: { type: [itemSchema], required: true },
  userId: { type: String, required: true },  
  userName: { type: String, required: true } 
});

export type OrderModel = OrderDetails & Document;
export default mongoose.model<OrderModel>('Order', orderDetailsSchema);
