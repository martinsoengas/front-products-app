import Modal from "../utils/Modal";
//MUI
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

export default function MediaCard(props) {
  const { id, title, content, image, other_info } = props;

  const deleteHandler = () => {
    props.onDelete(id);
  };

  return (
    <Card sx={{ width: "95%", margin: 1 }}>
      <CardMedia component="img" height="200" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {other_info}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack spacing={1} direction="row">
          <Modal
            title={title}
            content={content}
            image={image}
            other_info={other_info}
          />
          <Typography variant="button">
            <Button variant="contained" color="warning">
              Edit
            </Button>
          </Typography>
          <Typography variant="button">
            <Button variant="contained" color="error" onClick={deleteHandler}>
              Delete
            </Button>
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  );
}
