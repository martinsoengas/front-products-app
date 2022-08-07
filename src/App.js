import "./App.css";
import { Route, Routes } from "react-router-dom";

import AllProducts from "./Pages/AllProducts";
import NewProduct from "./Pages/NewProduct";
import Layout from "./Layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/new-product" element={<NewProduct />} />
      </Routes>
    </Layout>
  );
}

export default App;
