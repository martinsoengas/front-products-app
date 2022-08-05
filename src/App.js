import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import AllProducts from "./Pages/AllProducts";
import NewProduct from "./Pages/NewProduct";
import { Fragment } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<AllProducts />} />
        <Route path="/new-product" element={<NewProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
