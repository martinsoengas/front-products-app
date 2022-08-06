import Card from "../Layout/Card";
import { Grid } from "@mui/material";

const Product = (props) => {
  const { name, description, price, image_url } = props;

  return (
    <Grid item md={4}>
      <Card
        title={name}
        content={description}
        image={image_url}
        other_info={price}
      />
    </Grid>
  );
};

export default Product;
