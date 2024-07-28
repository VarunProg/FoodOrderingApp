import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import OrderForm from './routes/OrderForm';
import OrderList from './routes/OrderList';
import { ROUTES } from './utils/constant';
import {
  NotFound,
  ProtectedRoute,
  LandingPage,
  LoginPage,
} from "./routes";

function App() {

  return (
    <>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.LANDING_PAGE} element={<LandingPage />}>
            <Route path={ROUTES.ORDERS} element={<OrderList />} />
            <Route path={ROUTES.CREATE_ORDER} element={<OrderForm />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
