import React from "react";
import { Spinner } from "react-bootstrap";

const loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}>
      <h1 className='sr-only'>Loading</h1>
    </Spinner>
  );
};

export default loader;
