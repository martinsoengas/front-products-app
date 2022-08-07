import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { Grid, TextField, Stack } from "@mui/material";
import useHttp from "../hooks/useHttp";
import { updateOneProduct } from "../api/api";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 10,
  p: 4,
};

export default function ProductEditModal(props) {
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

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const imageChangeHandler = (e) => {
    setImage(e.target.value);
  };

  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };

  const saveEditHandler = () => {
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

      sendRequest(productEdited);
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
            <Grid item xs={6}>
              <TextField
                label="Name"
                variant="outlined"
                required
                fullWidth
                value={name}
                onChange={nameChangeHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                variant="outlined"
                required
                fullWidth
                value={price}
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
                value={description}
                onChange={descriptionChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
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
