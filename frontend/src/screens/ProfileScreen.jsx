import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

const ProfileScreen = ({ history }) => {
  const [email, setemail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = updateProfile;

  const orderMyList = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setemail(user.email);
      }
    }
  }, [history, dispatch, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // DISPATCH REGISTER
    if (password !== confirmPassword || password.length <= 6) {
      setMessage("Invalid Password");
    } else {
      //DISPATCH UPDATTE PROFILE
      dispatch(updateUserProfile({ ...user, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2> User Profile</h2>

        {success && <Message variant='success'>Profile Updated</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Enter Your Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='First Name  & Last Name'
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setemail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group>
            <br></br>
            <Form.Label>
              <h5>Update Your password</h5>
            </Form.Label>
          </Form.Group>

          <Form.Group controlId='Password'>
            <Form.Label>Password </Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='ConfirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL </th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
