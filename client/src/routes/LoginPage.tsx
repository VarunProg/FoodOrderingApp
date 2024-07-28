import { useAuth0 } from '@auth0/auth0-react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { ROUTES } from '../utils/constant';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  console.log("isAuthenticated", isAuthenticated)

  const navigateToDashboard = () => {
    navigate(ROUTES.LANDING_PAGE);
  };


  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto justify-content-center align-items-center">
        <Col xs={12} md={8} lg={10} className="text-center p-4 border rounded">
          <h3>Sign in to stay connected</h3>
          <p>Welcome to food ordering app</p>
          {!isAuthenticated ? (
            <Button onClick={() => loginWithRedirect()} className="mt-3 w-100">
              Sign In
            </Button>
          ) : (
            <>
              <p className="mt-3">You are already logged in.</p>
              <Button onClick={() => navigateToDashboard()} className="mt-3 w-100">
                Go back to Home
              </Button>
            </>
          )}



        </Col>
      </Row>
    </Container>
  );
};

