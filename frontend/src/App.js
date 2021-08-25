import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Loader from "./components/Loader";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

const OrderListScreen = React.lazy(() => import("./screens/OrderListScreen"));
const ProductEditScreen = React.lazy(() =>
  import("./screens/ProductEditScreen"),
);
const ProductListScreen = React.lazy(() =>
  import("./screens/ProductListScreen"),
);
const UserEditScreen = React.lazy(() => import("./screens/UserEditScreen"));
const UserListScreen = React.lazy(() => import("./screens/UserListScreen"));
const OrderScreen = React.lazy(() => import("./screens/OrderScreen"));
const PlaceOrderScreen = React.lazy(() => import("./screens/PlaceOrderScreen"));
const PaymentScreen = React.lazy(() => import("./screens/PaymentScreen"));
const ShippingScreen = React.lazy(() => import("./screens/ShippingScreen"));

function App() {
  console.clear();
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Suspense fallback={<Loader />}>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/page/:pageNumber' component={HomeScreen} exact />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route
              path='/search/:keyword/page/:pageNumber'
              component={HomeScreen}
              exact
            />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/order/:id' component={OrderScreen} />

            <Route path='/admin/orderlist' component={OrderListScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route
              path='/admin/productlist'
              component={ProductListScreen}
              exact
            />
            <Route
              path='/admin/productlist/:pageNumber'
              component={ProductListScreen}
              exact
            />
            <Route
              path='/admin/product/:id/edit'
              component={ProductEditScreen}
            />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
