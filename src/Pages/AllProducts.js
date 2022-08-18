import useHttp from "../hooks/useHttp";
import { getAllProducts } from "../api/api";
import { Fragment, useEffect } from "react";
import CircularIndeterminate from "../Layout/CircularProgress";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";

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
    return <CircularIndeterminate />;
  }

  return (
    <Fragment>
      <Paper sx={{ backgroundColor: "#f5f5f5" }}>
        <CardMedia
          component="img"
          image="https://i.imgur.com/Bz4pNL3.jpg"
          alt="airplane"
        />
      </Paper>
      <Paper
        sx={{
          maxWidth: "60rem",
          margin: "3rem auto",
          backgroundColor: "#f5f5f5",
        }}
      >
        <ProductsList products={loadedProducts} />
      </Paper>
    </Fragment>
  );
};

export default AllProducts;
