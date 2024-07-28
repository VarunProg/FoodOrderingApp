import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../services/api';

import { useNavigate } from 'react-router-dom';

export interface Items {
  _id?: string;
  name: string;
  amount: number;
}

export interface OrderDetails {
  _id?: string;
  address: string;
  name: string;
  phoneNumber: string;
  items: Items[];
}

const OrderForm = () => {
  const {createOrder } = useApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    address: '',
    name: '',
    phoneNumber: '',
    items: [{ name: '', amount: 1 }]
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordersDetail'] });
      setSuccessMessage('Your order has been created successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    },
    onError: (error) => {
      console.error('Error creating order:', error);
      setSuccessMessage('Failed to create the order. Please try again.');
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const items = [...orderDetails.items];
    items[index] = { ...items[index], [name]: value };
    setOrderDetails(prevState => ({
      ...prevState,
      items
    }));
  };

  const addItem = () => {
    setOrderDetails(prevState => ({
      ...prevState,
      items: [...prevState.items, { name: '', amount: 1 }]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(orderDetails);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h1 className="text-center mb-4">Create Order</h1>
          {successMessage && (
            <Alert variant={mutation.isSuccess ? 'success' : 'danger'}>
              {successMessage}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={orderDetails.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={orderDetails.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={orderDetails.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            {orderDetails.items.map((item, index) => (
              <Row key={index} className="align-items-center mb-3">
                <Col xs={5}>
                  <Form.Group controlId={`formItemName${index}`}>
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={item.name}
                      onChange={e => handleItemChange(index, e)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={5}>
                  <Form.Group controlId={`formItemAmount${index}`}>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={item.amount}
                      onChange={e => handleItemChange(index, e)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={2}>
                  <Button variant="primary" onClick={addItem} className="w-100 mt-4">
                    Add Item
                  </Button>
                </Col>
              </Row>
            ))}
            <Button variant="success" type="submit" className="mt-3">
              Submit Order
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderForm;
