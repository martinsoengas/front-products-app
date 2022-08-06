import useHttp from "../hooks/useHttp";
import { getAllProducts } from "../api/api";
import { useEffect } from "react";
import CircularIndeterminate from "../Layout/CircularProgress";

import ProductsList from "../components/ProductsList";

const AllProducts = () => {
  const {
    sendRequest,
    status,
    data: loadedProducts,
    error,
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

  return <ProductsList products={loadedProducts} />;
};

export default AllProducts;
