import pool from "../../../../config/db/conectionDb.js";
import bcrypt from "bcryptjs";

//Table: user_data
const createUser = async (
  rut,
  name,
  last_name,
  postal_code,
  email,
  password,
  birth_date,
  rol
) => {
  try {
    const hashedPassword = bcrypt.hashSync(password);
    const SQLquery = {
      text: 'INSERT INTO user_data (rut, name, last_name, postal_code, email, password, birth_date, rol ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * ; ',
      values: [
        rut,
        name,
        last_name,
        postal_code,
        email,
        hashedPassword,
        birth_date,
        rol
      ]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const updateUsers = async (
  id,
  rut,
  name,
  last_name,
  postal_code,
  email,
  password,
  birth_date,
  rol
) => {
  try {
    const SQLquery = {
      text: 'UPDATE user_data SET rut = COALESCE($1, rut), name = COALESCE($2, name), last_name = COALESCE($3, last_name), postal_code = COALESCE($4, postal_code), email = COALESCE($5, email), password = COALESCE($6, password), birth_date = COALESCE($7, birth_date), rol = COALESCE($8, rol) WHERE id = $9 RETURNING *;',
      values: [
        rut,
        name,
        last_name,
        postal_code,
        email,
        password,
        birth_date,
        rol,
        id
      ]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const getUserAll = async () => {
  try {
    const SQLquery = {
      text: 'SELECT * FROM user_data;'
    };
    const response = await pool.query(SQLquery);
    return response.rows;
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const getUser = async (id) => {
  try {
    const SQLquery = {
      text: 'SELECT * FROM user_data WHERE rut = $1',
      values: [id]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const byEmail = async ({ email }) => {
  try {
    const SQLquery = {
      text: 'SELECT * FROM user_data WHERE email = $1',
      values: [email]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const deleteUserByIds = async (id) => {
  try {
    const SQLquery = {
      text: 'DELETE FROM user_data WHERE id = $1 RETURNING *',
      values: [id]
    };
    const response = await pool.query(SQLquery);
    if (response.rowCount == 0) {
      throw new Error("This item has already been deleted or not exist...");
    }
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

//Address table
const createAddress = async ({
  postal_code,
  street_name,
  phone,
  address_number,
  commune,
  city,
  region
}) => {
  try {
    const SQLquery = {
      text: `INSERT INTO address (postal_code, street_name, phone, address_number, commune, city, region ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ; `,
      values: [
        postal_code,
        street_name,
        phone,
        address_number,
        commune,
        city,
        region
      ]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const editAddress = async (
  postal_code,
  street_name,
  phone,
  address_number,
  commune,
  city,
  region
) => {
  try {
    const SQLquery = {
      text: "UPDATE address SET street_name = COALESCE($2, street_name), phone = COALESCE($3, phone), address_number = COALESCE($4, address_number), commune = COALESCE($5, commune), city = COALESCE($6, city), region = COALESCE($7, region) WHERE postal_code = $1 RETURNING *;",
      values: [
        postal_code,
        street_name,
        phone,
        address_number,
        commune,
        city,
        region
      ]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const deleteAddress = async (postal_code) => {
  try {
    const SQLquery = {
      text: "DELETE FROM address WHERE postal_code = $1 RETURNING *",
      values: [postal_code]
    };
    const response = await pool.query(SQLquery);
    if (response.rowCount == 0) {
      throw new Error("This item has been deleted...");
    }
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

//table: favorites

const getFavoritesByUsers = async (client_rut) => {
  try {
    const SQLquery = {
      text: `SELECT fav.rut, fav.product_code, fav.description, fav.product_name, fav.price, fav.stock, fav.product_image 
            FROM (
                  SELECT *, user_data.name AS name_user, products.name AS product_name, products.id AS product_code
                  FROM favorites
                  RIGHT JOIN user_data ON favorites.client_rut = user_data.rut 
                  RIGHT JOIN products ON favorites.product_id = products.id
                  WHERE favorites.client_rut = $1
                  ORDER BY favorites.client_rut
            ) AS fav 
            ORDER BY fav.product_id ;`,

      values: [client_rut]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

const addToFavorites = async (client_rut, product_id) => {
  try {
    const SQLquery = {
      text: 'INSERT INTO "favorites" (client_rut, product_id) VALUES ($1, $2) RETURNING *',
      values: [client_rut, product_id]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};
const deleteFavorites = async (favorites_id) => {
  try {
    const SQLquery = {
      text: 'DELETE FROM "favorites" WHERE favorites_id = $1 RETURNING *',
      values: [favorites_id]
    };
    const response = await pool.query(SQLquery);
    if (response.rowCount == 0) {
      throw new Error("This item has already been deleted or not exist...");
    }
    return response.rows[0];
  } catch (error) {
    throw new Error("error: " + error.code + " :" + error.message);
  }
};

export {
  createUser,
  updateUsers,
  getUser,
  getFavoritesByUsers,
  addToFavorites,
  deleteUserByIds,
  getUserAll,
  createAddress,
  deleteAddress,
  deleteFavorites,
  editAddress,
  byEmail
};
