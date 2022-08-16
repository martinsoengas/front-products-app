import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/auth-context";
import Layout from "./Layout/Layout";
import Login from "./Pages/Login";
import AllProducts from "./Pages/AllProducts";
import NewProduct from "./Pages/NewProduct";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.isAdmin;

  return (
    <Layout>
      <Routes>
        <Route path="*" element={<p>404 - Not found</p>} />
        <Route path="/" element={<Navigate replace to="/products" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<AllProducts />} />
        {isLoggedIn && isAdmin ? (
          <Route path="/new-product" element={<NewProduct />} />
        ) : (
          <Route
            path="/new-product"
            element={<Navigate replace to="/products" />}
          />
        )}

        <Route path="/edited" element={<Navigate replace to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
