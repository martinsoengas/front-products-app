import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

import AllProducts from "./Pages/AllProducts";
import NewProduct from "./Pages/NewProduct";
import Layout from "./Layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/edited" element={<Navigate replace to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
