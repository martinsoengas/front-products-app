const rootURI = process.env.REACT_APP_SERVER_URL
  ? process.env.REACT_APP_SERVER_URL
  : "http://localhost:4000";

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
      throw new Error(data.message || "Could not create product");
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
      body: JSON.stringify(newProduct.newProduct),
      headers: {
        Authorization: "Bearer " + newProduct.authToken,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not create product");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOneProduct = async (updateProduct) => {
  try {
    const response = await fetch(
      `${rootURI}/product/${updateProduct.productEdited._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updateProduct.productEdited),
        headers: {
          Authorization: "Bearer " + updateProduct.authToken,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not update product");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOneProduct = async (productId) => {
  try {
    const response = await fetch(`${rootURI}/product/${productId.productId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + productId.authToken,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not delete product");
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (user) => {
  try {
    const response = await fetch(`${rootURI}/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not login");
    }

    return data;
  } catch (error) {
    return { error };
  }
};

export const logout = async (userId) => {
  try {
    const response = await fetch(`${rootURI}/logout`, {
      method: "DELETE",
      body: JSON.stringify({ _id: userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not login");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const adminCheck = async (admin) => {
  try {
    const response = await fetch(`${rootURI}/admin`, {
      body: JSON.stringify({ _id: admin.adminId }),
      headers: {
        Authorization: "Bearer " + admin.authToken,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not check valid admin");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
