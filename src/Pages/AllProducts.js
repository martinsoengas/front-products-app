import useHttp from "../hooks/useHttp";
import { getAllProducts } from "../api/api";
import { Fragment, useEffect } from "react";
import CircularIndeterminate from "../Layout/CircularProgress";
import { Typography } from "@mui/material";

import ProductsList from "../components/ProductsList";

const AllProducts = () => {
  const {
    sendRequest,
    status,
    data: loadedProducts,
    // error,
  } = useHttp(getAllProducts, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <section className="centered">
        <CircularIndeterminate />
      </section>
    );
  }

  return (
    <Fragment>
      <Typography variant="h3" component="div" gutterBottom>
        Aviation Products
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        Here you will find all products related to Aviation
      </Typography>
      <ProductsList products={loadedProducts} />
    </Fragment>
  );
};

export default AllProducts;
