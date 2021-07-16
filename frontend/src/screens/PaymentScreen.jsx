import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";

import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const { shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod");
    paymentMethodFromLocalStorage
      ? setPaymentMethod(paymentMethodFromLocalStorage)
      : setPaymentMethod("");
  }, []);

  if (!shippingAddress) {
    history.replace("/shipping");
  }

  const paymentScreenSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1> Payment Method</h1>
      <Form onSubmit={paymentScreenSubmitHandler}>
        <Form.Group controlId='Country'>
          <Form.Label as='legend'>Select Payment Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='Paypal or Credit Cart'
              id='Paypal'
              name='paymentMethod'
              value='Paypal'
              checked={paymentMethod === "Paypal"}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}></Form.Check>
          </Col>
          <Col>
            <Form.Check
              type='radio'
              label='Knet'
              id='Knet'
              name='paymentMethod'
              value='Knet'
              checked={paymentMethod === "Knet"}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary' disabled={paymentMethod === ""}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
