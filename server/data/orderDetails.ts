import mongoose from "mongoose";
import {OrderDetails} from "../model/ordersModal"

const orderDetails: OrderDetails[] = [{
  address: "Berlin",
  name: "Varun",
  phoneNumber: "017670616736",
  items: [
    { name: "Apple", amount: 1 }, 
    { name: "Banana", amount: 5 } 
  ]
}];

export default orderDetails;