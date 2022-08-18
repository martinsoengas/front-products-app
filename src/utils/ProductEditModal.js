import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Stack } from "@mui/material";

import { useState, useEffect, useContext } from "react";
import useHttp from "../hooks/useHttp";
import { updateOneProduct } from "../api/api";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxWidth: "700px",
  minWidth: "330px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 10,
  p: 4,
};

export default function ProductEditModal(props) {
  const authCtx = useContext(AuthContext);
  const { sendRequest, status } = useHttp(updateOneProduct);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [image, setImage] = useState(props.image);
  const [price, setPrice] = useState(props.price);

  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const nameChangeHandler = (e) => {
    if (e) {
      setNameError(false);
    }
    setName(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    if (e) {
      setDescriptionError(false);
    }
    setDescription(e.target.value);
  };

  const imageChangeHandler = (e) => {
    if (e) {
      setImageError(false);
    }
    setImage(e.target.value);
  };

  const priceChangeHandler = (e) => {
    if (e) {
      setPriceError(false);
    }
    setPrice(e.target.value);
  };

  const saveEditHandler = () => {
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

    if (!image) {
      setImageError(true);
      return;
    }

    const confirmDelete = window.confirm(
      "¿Are you sure do you want to edit this product?"
    );
    if (confirmDelete === true) {
      const productEdited = {
        _id: props.id,
        name: name,
        description: description,
        image_url: image,
        price: price,
      };

      sendRequest({ productEdited, authToken: authCtx.token });
    }
  };

  useEffect(() => {
    if (status === "completed") {
      navigate("/edited", { replace: true });
    }
  }, [status, navigate]);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} color="warning">
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} margin={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" component="div" gutterBottom>
                Edit Product
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={nameError ? true : false}
                label={nameError ? "Please insert a valid name" : "Name"}
                variant="outlined"
                required
                fullWidth
                value={name}
                onChange={nameChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={priceError ? true : false}
                label={priceError ? "Please insert a valid price" : "Price"}
                variant="outlined"
                required
                fullWidth
                value={price}
                helperText={priceError ? "Only numbers" : null}
                onChange={priceChangeHandler}
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
                value={description}
                onChange={descriptionChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={imageError ? true : false}
                label={
                  imageError ? "Please insert a valid image URL" : "Image URL"
                }
                variant="outlined"
                fullWidth
                required
                value={image}
                onChange={imageChangeHandler}
              />
            </Grid>
          </Grid>

          <Stack spacing={1} direction="row" margin={1}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              onClick={saveEditHandler}
              color="success"
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
