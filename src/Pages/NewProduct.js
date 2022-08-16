import ProductForm from "../components/ProductForm";
import useHttp from "../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import { addOneProduct } from "../api/api";
import { useEffect, useContext } from "react";
import CircularIndeterminate from "../Layout/CircularProgress";
import AuthContext from "../context/auth-context";

const NewProduct = () => {
  const authCtx = useContext(AuthContext);
  const { sendRequest, status } = useHttp(addOneProduct);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "completed") {
      navigate("/products", { replace: true });
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
    const confirmAdd = window.confirm(
      "¿Are you sure do you want to create this new product?"
    );
    if (confirmAdd === true) {
      sendRequest({ newProduct, authToken: authCtx.token });
    }
  };

  return <ProductForm addProduct={addProductHandler} />;
};

export default NewProduct;
