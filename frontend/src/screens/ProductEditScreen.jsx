import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstats";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setcategory] = useState("");
  const [countInStock, setcountInStock] = useState(0);
  const [Description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.productDetails);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product || !product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setImage(product.image);
        setPrice(product.price);
        setcategory(product.category);
        setBrand(product.brand);
        setcountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [successUpdate, product, dispatch, productId, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    //update Product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description: Description,
      }),
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1> Edit Product</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Enter product Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Product name'
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>price </Form.Label>
              <Form.Control
                type='price'
                placeholder='price '
                value={price}
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='Image'>
              <Form.Label>Product Image </Form.Label>
              <br></br>
              <Image src={image} fluid style={{ width: "100px" }} />
              <br></br>
              <Form.Control
                type='text'
                placeholder='Image'
                value={`Image File Path: ${image}`}
                onChange={(e) => setImage(e.target.value)}
              />{" "}
              <Form.Control type='file' label='Choose File' custom onChange={uploadFileHandler} />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Brand '
                value={brand}
                onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock </Form.Label>
              <Form.Control
                type='text'
                placeholder='Count In Stock'
                value={countInStock}
                onChange={(e) => setcountInStock(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category '
                value={category}
                onChange={(e) => setcategory(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='Description'>
              <Form.Label>Description </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description '
                value={Description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
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

export default ProductEditScreen;
