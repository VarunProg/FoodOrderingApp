import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { OrderDetails } from '../routes/OrderForm';

const apiEndpoint = 'http://localhost:3000';

export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllOrdersDetails = async (): Promise<any> => {
    const token = await getAccessTokenSilently();
    const response = await axios.get(`${apiEndpoint}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const createOrder = async (orderDetails: OrderDetails) => {
    const token = await getAccessTokenSilently();
    const response = await axios.post(`${apiEndpoint}/createOrder`, orderDetails, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Order created:', response.data);
  };

  const deleteOrder = async (orderId: string) => {
    const token = await getAccessTokenSilently();
    const response = await axios.delete(`${apiEndpoint}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  return { getAllOrdersDetails, createOrder, deleteOrder };
};