const rootURI = process.env.SERVER_URL
  ? process.env.SERVER_URL
  : "http://localhost:4000";

export const getAllProducts = async () => {
  const response = await fetch(`${rootURI}/products`);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = await response.json();

  const loadedProducts = [];

  for (const key in data) {
    loadedProducts.push({
      id: data[key]._id,
      name: data[key].name,
      description: data[key].description,
      image_url: data[key].image_url,
      price: data[key].price,
    });
  }

  return loadedProducts;
};
