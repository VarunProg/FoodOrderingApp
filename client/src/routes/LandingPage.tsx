import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';

export const LandingPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={10}>
          <div data-testid="main-content">
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
