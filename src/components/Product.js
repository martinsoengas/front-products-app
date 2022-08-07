import { Grid } from "@mui/material";
import Modal from "../utils/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import ProductEditModal from "../utils/ProductEditModal";

const Product = (props) => {
  const { id, name, description, price, image_url } = props;

  const deleteHandler = () => props.onDelete(id);

  return (
    <Grid item md={4}>
      <Card sx={{ width: "95%", margin: 1 }}>
        <CardMedia component="img" height="200" image={image_url} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {price}
          </Typography>
        </CardContent>
        <CardActions>
          <Stack spacing={1} direction="row">
            <Modal
              title={name}
              content={description}
              image={image_url}
              other_info={price}
            />
            <ProductEditModal
              id={id}
              name={name}
              description={description}
              image={image_url}
              price={price}
            />
            <Typography variant="button">
              <Button variant="contained" color="error" onClick={deleteHandler}>
                Delete
              </Button>
            </Typography>
          </Stack>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
