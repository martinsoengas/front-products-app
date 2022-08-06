import ProductForm from "../components/ProductForm";
import useHttp from "../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import { addOneProduct } from "../api/api";
import { useEffect } from "react";

const NewProduct = () => {
  const { sendRequest, status } = useHttp(addOneProduct);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "completed") {
      navigate("/");
    }
  }, [status, navigate]);

  const addProductHandler = (newProduct) => {
    sendRequest(newProduct);
  };

  return <ProductForm addProduct={addProductHandler} />;
};

export default NewProduct;
