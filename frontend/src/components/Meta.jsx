import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to ProShop",
  description: "We Sell the best products for a fair price",
  keyword: "electronics, buy electronics, cheap electronics",
};
export default Meta;
