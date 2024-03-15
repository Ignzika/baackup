import express from "express";
import {
  getAllProducts,
  updateProducts,
  deleteProduct,
  createProducts,
  getProductsById,
  patchProduct,
  buyOrder,
  addCart,
  salesHistory,
  removeFromCart
} from "../../src/api/v1/controllers/productController.js";
import { notFound } from "../../src/api/v1/controllers/notFoundController.js";
const router = express.Router();

//products 
router.get("/products", getAllProducts);
router.get("/product/:id", getProductsById);
router.get("/admin/product/:id", getProductsById); //podria ser 1 ruta
router.post("/admin/products", createProducts);
router.delete("/admin/product/:id", deleteProduct);
router.put("/admin/product/:id", updateProducts);
router.patch("/admin/product/:id", patchProduct); // no son necesarias las 2

// rutas para proceso de compra
  //carro
router.post("/user/cart", addCart);
router.post("/user/cart/:id", removeFromCart);
  //orden
router.post("/user/order", buyOrder);
  //historial
router.post("/users/history", salesHistory);

router.all("*", notFound); //pasar a session routee

export default router;


// const baseURLProducts = "https://backend-backup-3tm8.onrender.com/api/v1/store";

// // Rutas para productos
// baseURL + "/products" //get
// baseURL + "/product/:id" //get
// baseURL + "/admin/product/:id" //get
// baseURL + "/admin/products" //post
// baseURL + "/admin/product/:id" //delete
// baseURL + "/admin/product/:id" //put
// baseURL + "/admin/product/:id"//patch
// carro:
// baseURL + "/user/cart"//post
// baseURL + "/user/cart/:id"//delete
// orden:
// baseURL + "/user/order" //post
// historial:
// baseURL + "/users/history" //post