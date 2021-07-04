import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import QuantityList from "../components/QuantityList";
import Message from "../components/Message";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = Number(location.search?.split("=")[1]);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId && qty) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const updateQty = (ID, QTY) => {
    dispatch(addToCart(ID, Number(QTY)));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getTotalAmount = () => {
    const total = cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2);

    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => {
              return (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={1}>${item.price}</Col>
                    <Col md={4}>
                      <QuantityList
                        variant='light'
                        style={{
                          width: "50px",
                          margin: "auto",
                          display: "block",
                        }}
                        qty={item.qty}
                        setQty={updateQty.bind(this, item.product)}
                        product={item}
                      />
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}>
                        <i
                          className='fas fa-trash'
                          style={{ fontSize: "16px" }}></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items{" "}
              </h2>
              <h3 className='bold-text'>
                $&nbsp;
                {getTotalAmount()}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
