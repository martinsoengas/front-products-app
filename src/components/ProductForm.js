import { Card, CardContent, TextField, Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const ProductForm = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const imageUrlChangeHandler = (e) => {
    setImageUrl(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      price,
      description,
      image_url: imageUrl,
    };
    props.addProduct(newProduct);
  };

  return (
    <Card sx={{ width: "80%", margin: "0 auto", height: "500" }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          Create new product
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          Please complete all fields with *
        </Typography>
        <form noValidate autoComplete="off" onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                onChange={nameChangeHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                required
                onChange={priceChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
                onChange={descriptionChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                required
                onChange={imageUrlChangeHandler}
              />
            </Grid>
            <Grid item xs={2}>
              <Button type="submit" variant="contained">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
