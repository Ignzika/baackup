import pool from "../../../../config/db/conectionDb.js";

//table: products
const getProduct = async () => {
  try {
    const SQLquery = { text: "SELECT * FROM products ;" };
    const response = await pool.query(SQLquery);
    return response.rows;
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const ProductsById = async (id) => {
  try {
    const SQLquery = {
      text: "SELECT * FROM products WHERE id = $1",
      values: [id]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const createProduct = async (productData) => {
  try {
    const { name, description, price, stock, product_image } = productData;
    const SQLquery = {
      text: "INSERT INTO products (name, description, price, stock, product_image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      values: [name, description, price, stock, product_image]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const updateProduct = async (
  id,
  name,
  description,
  price,
  stock,
  product_image
) => {
  try {
    const SQLquery = {
      text: "UPDATE products SET name = $1, description = $2, price = $3, stock = $4, product_image = $5 WHERE id = $6 RETURNING *",
      values: [name, description, price, stock, product_image, id]
    };
    const response = await pool.query(SQLquery);
    if (response.rowCount == 0) {
      throw new Error("Not Found, check ID");
    }
    return response.rows[0];
  } catch (error) {
    throw new Error("Error updating product: " + error.message);
  }
};

const destroyProduct = async (id) => {
  try {
    const SQLquery = {
      text: "DELETE FROM products WHERE id = $1",
      values: [id]
    };
    const response = await pool.query(SQLquery);
    return response.rowCount[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const patchUpdateProduct = async (
  id,
  name,
  description,
  price,
  stock,
  product_image
) => {
  try {
    const SQLquery = {
      text: "UPDATE products SET name = COALESCE($2,name),  description = COALESCE($3, description), price = COALESCE($4, price), stock = COALESCE($5,stock), product_image= COALESCE($6, product_image) WHERE id= $1  RETURNING * ;",
      values: [id, name, description, price, stock, product_image]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

// teable: store_cart
const createStoreCart = async (
  client_rut,
  product_code,
  product_price,
  product_amount,
  total_price
) => {
  try {
    const SQLquery = {
      text: "INSERT INTO store_cart (client_rut, product_code, product_price, product_amount, total_price) VALUES ($1,$2,$3,$4,$5) RETURNING *; ",
      values: [
        client_rut,
        product_code,
        product_price,
        product_amount,
        total_price
      ]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const destroyCart = async (id) => {
  try {
    const SQLquery = {
      text: "DELETE FROM favorites WHERE id = $1",
      values: [id]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

//table: buy_order
const createBuyOrder = async (
  cart_id,
  client_rut,
  postal_code,
  product_code,
  product_price,
  product_amount,
  total_price
) => {
  try {
    const SQLquery = {
      text: "INSERT INTO buy_order (cart_id, client_rut, postal_code, product_code, product_price, product_amount, total_price) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *; ",
      values: [
        cart_id,
        client_rut,
        postal_code,
        product_code,
        product_price,
        product_amount,
        total_price
      ]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const totalSaleByOrder = async (cliente_rut) => {
  try {
    const SQLquery = {
      text: "SELECT a.client_rut, SUM(a.products_value) AS total_value FROM (SELECT buy_order.client_rut, buy_order.product_amount * buy_order.product_price AS products_value FROM buy_order WHERE cliente_rut = $1) AS a ORDER BY a.client_rut; ",
      values: [cliente_rut]
    };
    const response = await pool.query(SQLquery);
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

// table: order_history
const createOrderHistory = async (
  client_rut,
  postal_code,
  product_code,
  product_price,
  product_amount,
  total_price,
  send_at
) => {
  try {
    const SQLquery = {
      text: "INSERT INTO store_cart (client_rut, postal_code, product_code, product_price, product_amount, total_price, send_at) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *; ",
      values: [
        client_rut,
        postal_code,
        product_code,
        product_price,
        product_amount,
        total_price,
        send_at
      ]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const getOrderHistory = async (
  id,

) => {
  try {
    const SQLquery = {
      text: "SELECT * FROM store_cart WHERE client_rut = $1",
      values: [
        id,
      ]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};
export {
  getProduct,
  updateProduct,
  destroyProduct,
  createProduct,
  ProductsById,
  patchUpdateProduct,
  createStoreCart,
  createBuyOrder,
  createOrderHistory,
  destroyCart
};
