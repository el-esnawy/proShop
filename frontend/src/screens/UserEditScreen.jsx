import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [email, setemail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorupdate, success: successUpadte } = userUpdate;
  useEffect(() => {
    if (successUpadte) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    }
    if (!user || !user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setemail(user.email);
      setisAdmin(user.isAdmin);
    }
  }, [user, dispatch, userId, successUpadte, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
      }),
    );
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1> Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorupdate && <Message variant='danger'>{errorupdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                checked={isAdmin}
                label='Is Admin'
                onChange={(e) => setisAdmin(e.target.checked)}></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
