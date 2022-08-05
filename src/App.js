import "./App.css";
import { getAllProducts } from "./api/api";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const loadProducts = async () => {
      const loadedProducts = await getAllProducts();
      setProducts(loadedProducts);
    };
    loadProducts();
  }, []);

  if (!products) {
    return <p>Loading...</p>;
  }

  // return <div className="App">{products.map}</div>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <h2>{product.name}</h2>
          <h3>${product.price}</h3>
          <p>{product.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default App;
