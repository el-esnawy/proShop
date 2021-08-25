import React, { useEffect, useState } from "react";
import QuantityList from "../components/QuantityList";
import Meta from "../components/Meta";

import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, createReview } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstats";

const ProductScreen = ({ match, history }) => {
  const qty = React.useRef(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { success: SuccessProductReview, error: errorReview } = useSelector(
    (state) => state.productReviewCreate,
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));

    if (SuccessProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, SuccessProductReview]);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails,
  );

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty.current}`);
  };

  const setQty = (value) => {
    qty.current = parseInt(value);
  };
  const submitReviewHandler = (e) => {
    e.preventDefault();
    if (comment.length !== 0 || rating !== 0) {
      dispatch(
        createReview(match.params.id, {
          rating,
          comment,
        }),
      );
    } else {
      alert(
        "Please make sure to include a Rating & a Comment for the product you want to review",
      );
    }
  };

  return (
    <React.Fragment>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <React.Fragment>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={3}>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} Review`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <QuantityList
                          qty={qty.current}
                          setQty={setQty}
                          product={product}
                          activeNumber={qty.current}
                        />
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant='message'>No Reviews</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => {
                  return (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p> {review.comment}</p>
                    </ListGroup.Item>
                  );
                })}

                <ListGroup.Item>
                  <h2>Write a customer Review</h2>
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}>
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          rows={3}
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>Sign In</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductScreen;
