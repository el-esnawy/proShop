import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = ({ match }) => {
  const { keyword } = match.params;

  const { products, loading, error, page, pages } = useSelector(
    (state) => state.productList,
  );
  const dispatch = useDispatch();

  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <React.Fragment>
      <Meta />
      <h1>Latest Products</h1>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back Home
        </Link>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <React.Fragment>
          <Row>
            {products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ""}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HomeScreen;
