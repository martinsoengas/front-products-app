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

  //   {
  //      <li>
  //       <h1>{name}</h1>
  //       <h3>${price}</h3>
  //       <img src={image_url} alt={description} height="400" />
  //       <Modal
  //         title={name}
  //         content={description}
  //         image={image_url}
  //         other_info={price}
  //       />
  //     </li>
  //   );
  //   }
};

export default Product;
