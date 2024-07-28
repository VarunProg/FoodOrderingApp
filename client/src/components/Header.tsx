import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Image, Nav, Navbar, Container } from "react-bootstrap";
import { ROUTES } from '../utils/constant';

export const Header = () => {
  const { isAuthenticated, user: userData, logout: auth0Logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    auth0Logout();
    navigate(ROUTES.LOGIN);
  };

  const handleCreateOrderClick = () => {
    navigate(ROUTES.CREATE_ORDER);
  };

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={ROUTES.ORDERS}>
              Home
            </Nav.Link>
            <Button onClick={handleCreateOrderClick}>
              Create Order
            </Button>
          </Nav>
          {isAuthenticated ? (
            <Nav className="ml-auto">
              <Image src={userData?.picture} roundedCircle={true} width="40" height="40" />
              <Navbar.Text className="mx-2">{userData?.given_name}</Navbar.Text>
              <Button variant="outline-danger" onClick={handleLogoutClick}>
                Sign Out
              </Button>
            </Nav>
          ) : (
            <Navbar.Text>User data loading...</Navbar.Text>
          )}
        </Container>
      </Navbar>
    </header>
  );
};
