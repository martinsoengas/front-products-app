import Product from "./Product";
import { Grid } from "@mui/material";

const ProductsList = (props) => {
  const products = props.products;

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
          />
        );
      })}
    </Grid>
  );
};

export default ProductsList;
