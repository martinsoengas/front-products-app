import { Card, CardContent, TextField, Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const ProductForm = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageUrlError, setImageUrlError] = useState(false);

  const nameChangeHandler = (e) => {
    if (e) {
      setNameError(false);
    }
    setName(e.target.value);
  };

  const priceChangeHandler = (e) => {
    if (e) {
      setPriceError(false);
    }
    setPrice(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    if (e) {
      setDescriptionError(false);
    }
    setDescription(e.target.value);
  };

  const imageUrlChangeHandler = (e) => {
    if (e) {
      setImageUrlError(false);
    }
    setImageUrl(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name) {
      setNameError(true);
      return;
    }

    if (!price || isNaN(price)) {
      setPriceError(true);
      return;
    }

    if (!description) {
      setDescriptionError(true);
      return;
    }

    if (!imageUrl) {
      setImageUrlError(true);
      return;
    }

    const newProduct = {
      name,
      price,
      description,
      image_url: imageUrl,
    };
    props.addProduct(newProduct);
  };

  return (
    <Card sx={{ margin: "0 auto", maxWidth: "600px", marginTop: "3rem" }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          Create new product
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          Please complete all fields with *
        </Typography>
        <form noValidate autoComplete="off" onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={nameError ? true : false}
                label={nameError ? "Please insert a valid name" : "Name"}
                variant="outlined"
                fullWidth
                required
                onChange={nameChangeHandler}
                value={name}
                inputProps={{ maxLength: 30 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={priceError ? true : false}
                label={priceError ? "Please insert a valid price" : "Price"}
                variant="outlined"
                fullWidth
                required
                onChange={priceChangeHandler}
                helperText={priceError ? "Only numbers" : null}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={descriptionError ? true : false}
                label={
                  descriptionError
                    ? "Please insert a valid description"
                    : "Description"
                }
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
                onChange={descriptionChangeHandler}
                inputProps={{ maxLength: 200 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={imageUrlError ? true : false}
                label={
                  imageUrlError ? "Please insert a valid URL" : "Image URL"
                }
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
