import {
  Container,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
} from "@mui/material";

const ProductForm = () => {
  return (
    <Grid container>
      <Grid item md={4}>
        <FormControl>
          <InputLabel htmlFor="my-input">Product name</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
        </FormControl>
      </Grid>
      <Grid item md={4}>
        <FormControl>
          <InputLabel htmlFor="my-input">Product name</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ProductForm;
