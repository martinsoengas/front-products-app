import ProductForm from "../components/ProductForm";
import useHttp from "../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import { addOneProduct } from "../api/api";
import { useEffect } from "react";
import CircularIndeterminate from "../Layout/CircularProgress";

const NewProduct = () => {
  const { sendRequest, status } = useHttp(addOneProduct);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "completed") {
      navigate("/");
    }
  }, [status, navigate]);

  if (status === "pending") {
    return (
      <section>
        <CircularIndeterminate />
      </section>
    );
  }

  const addProductHandler = (newProduct) => {
    const confirmDelete = window.confirm(
      "¿Are you sure do you want to create this new product?"
    );
    if (confirmDelete === true) {
      sendRequest(newProduct);
    }
  };

  return <ProductForm addProduct={addProductHandler} />;
};

export default NewProduct;
