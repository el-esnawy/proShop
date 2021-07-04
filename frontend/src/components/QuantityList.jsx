import React from "react";
import { Dropdown } from "react-bootstrap";

const QuantityList = ({ product, setQty, qty, variant }) => {
  const [currentQty, setCurrentQty] = React.useState(qty);
  const selectHandler = (e) => {
    setCurrentQty(parseInt(e));
    setQty(e);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant={variant ? variant : "primary"}
        id='dropdown-basic'
        className='btn-block'
        style={{
          width: "auto",
          margin: "auto",
          display: "block",
        }}>
        Quantity {currentQty !== 0 ? `: ${currentQty}` : ""}
        &nbsp;&nbsp;&nbsp;
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {[...Array(product.countInStock).keys()].map((x) => {
          return (
            <Dropdown.Item
              eventKey={x + 1}
              key={x + 1}
              onSelect={(e) => selectHandler(e)}
              active={currentQty === x + 1}>
              {x + 1}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default QuantityList;
