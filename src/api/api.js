const rootURI = process.env.REACT_APP_SERVER_URL
  ? process.env.REACT_APP_SERVER_URL
  : "http://localhost:4000";

console.log(rootURI);

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${rootURI}/products`);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    const loadedProducts = [];

    for (const key in data) {
      loadedProducts.push({
        id: data[key]._id,
        ...data[key],
      });
    }

    return loadedProducts;
  } catch (error) {
    console.log(error.message || "Failed to get products");
  }
};

export const getOneProduct = async (productId) => {
  try {
    const response = await fetch(`${rootURI}/product/${productId}`);

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || "Could not create customer");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addOneProduct = async (newProduct) => {
  try {
    const response = await fetch(`${rootURI}/new-product`, {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not create customer");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOneProduct = async (updateProduct) => {
  try {
    const response = await fetch(`${rootURI}/product/${updateProduct._id}`, {
      method: "PATCH",
      body: JSON.stringify(updateProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not update customer");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOneProduct = async (deleteProductId) => {
  try {
    const response = await fetch(`${rootURI}/product/${deleteProductId}`, {
      method: "DELETE",
    });

    const data = response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not delete customer");
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};
