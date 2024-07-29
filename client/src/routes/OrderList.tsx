import { useState } from 'react';
import { ListGroup, Card, Button, Container, Alert } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { useApi } from '../services/api';
import { OrderDetails } from './OrderForm';
import { useNavigate } from 'react-router-dom';

interface OrdersQueryOptions extends UseQueryOptions<any, Error, any, QueryKey> {
  staleTime?: number;
  cacheTime?: number;
}

const OrderList = () => {
  const { getAllOrdersDetails, deleteOrder } = useApi();
  const queryClient = useQueryClient();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const queryOptions: OrdersQueryOptions = {
    queryKey: ['ordersDetail'],
    queryFn: getAllOrdersDetails,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 30 * 60 * 1000, 
  };

  const { isLoading, isError, data, error } = useQuery(queryOptions);

  const mutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordersDetail'] });
      setAlertMessage('Order has been deleted successfully!');
      setTimeout(() => setAlertMessage(null), 3000); 
    },
    onError: (error) => {
      console.error('Error deleting order:', error);
      setAlertMessage('Failed to delete the order. Please try again.');
      setTimeout(() => setAlertMessage(null), 3000); 
    },
  });

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      mutation.mutate(orderId);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Orders List</h1>
      {alertMessage && (
        <Alert variant={mutation.isError ? 'danger' : 'success'}>
          {alertMessage}
        </Alert>
      )}
      {data.length === 0 ? (
        <Alert variant="info" className="text-center">
          There are no orders. Please <Button variant="link" onClick={() => navigate('/create-order')}>create an order</Button>.
        </Alert>
      ) : (
        <ListGroup>
          {data.map((order: OrderDetails) => (
            <ListGroup.Item key={order._id} className="mb-3">
              <Card>
                <Card.Body>
                  <h3>Order Info</h3>
                  <Card.Title>{order.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {order.address} - {order.phoneNumber}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Created by:</strong> {order.userName || 'Unknown'}
                  </Card.Text>
                  <ListGroup variant="flush">
                    {order.items.map((item, itemIndex) => (
                      <ListGroup.Item key={itemIndex}>
                        {item.name}: {item.amount}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Button
                    variant="danger"
                    className="mt-3"
                    onClick={() => handleDeleteOrder(order._id!)}
                  >
                    Delete Order
                  </Button>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default OrderList;
