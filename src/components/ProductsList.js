import Product from "./Product";
import { Grid } from "@mui/material";
import useHttp from "../hooks/useHttp";
import { deleteOneProduct } from "../api/api";
import { useState } from "react";

const ProductsList = (props) => {
  const [products, setProducts] = useState(props.products);

  const { sendRequest } = useHttp(deleteOneProduct);

  const deleteProductHandler = (productId) => {
    const confirmDelete = window.confirm(
      "¿Are you sure you want to delete this product?"
    );
    if (confirmDelete === true) {
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.filter(
          (product) => product.id !== productId
        );
        sendRequest(productId);

        return updatedProducts;
      });
    }
  };

  return (
    <Grid container>
      {products.map((product) => {
        return (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image_url={product.image_url}
            onDelete={deleteProductHandler}
          />
        );
      })}
    </Grid>
  );
};

export default ProductsList;
