// src/api.js
import axios from "axios";

const apiUrl = "https://fakestoreapi.com";

//Get all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products`);
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Get a single product
export const fetchSingleProduct = async (productId) => {
  try {
    const response = await axios.get(`${apiUrl}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${apiUrl}/products`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Limit results
export const fetchProductLimit = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products?limit=5'`);
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Sort results
export const fetchProductSort = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products?sort=desc`);

    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Get all categories
export const fetchAllCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products/categories`);

    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Get products in a specific category
export const fetchProductsInCategory = async (categoryName) => {
  try {
    const response = await axios.get(
      `${apiUrl}/products/category/${categoryName}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Add new product
export const fetchAddNewProduct = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products`, {
      method: "POST",
      body: JSON.stringify({
        title: "test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      }),
    });

    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Update a product by ID
export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(
      `${apiUrl}/products/${productId}`,
      productData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a product by ID
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${apiUrl}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Get all carts
export const fetchAllCarts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/carts`);

    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Get a single cart by ID
export const fetchSingleCart = async (cartId) => {
  try {
    const response = await axios.get(`${apiUrl}/carts/${cartId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Create a new cart
export const createCart = async (cartData) => {
  try {
    const response = await axios.post(`${apiUrl}/carts`, cartData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Update a cart by ID
export const updateCart = async (cartId, cartData) => {
  try {
    const response = await axios.put(`${apiUrl}/carts/${cartId}`, cartData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Delete a cart by ID
export const deleteCart = async (cartId) => {
  try {
    const response = await axios.delete(`${apiUrl}/carts/${cartId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Limit results
export const fetchLimitresults = async () => {
  try {
    const response = await axios.get(`${apiUrl}/carts?limit=5`);

    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Sort results
export const fetchSortResults = async () => {
  try {
    const response = await axios.get(`${apiUrl}/carts?sort=desc`);

    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Get carts in a date range
export const fetchCartsInDataRange = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/carts?startdate=2019-12-10&enddate=2020-10-10`
    );

    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Get user carts
export const fetchUserCarts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/carts/user/2`);

    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Get all users
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Get a single user by ID
export const fetchSingleUser = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/users`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Update a user by ID
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${apiUrl}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${apiUrl}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// User login
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
