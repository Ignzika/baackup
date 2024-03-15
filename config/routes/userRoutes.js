import express from "express";
import validateParametersUser from "../../middlewares/validateParamsUser.js";
import {
  createNewUser,
  updateUser,
  getAllUser,
  getUserId,
  getFavoritesByUser,
  addToFavorite,
  deleteUserById,
  setAddress,
  updateAddress,
  removeAddress,
  removeFavorites
} from "../../src/api/v1/controllers/userController.js"
import { loginProtect } from "../../middlewares/loginAuth.js";
// import { notFound } from "../../src/api/v1/controllers/notFoundController.js";
const router = express.Router();

 //Rutas para axios    /api/v1/store + la ruta de abajo

router.post("/user",createNewUser); 
// validateParametersUser
router.put("/user/:id",loginProtect, updateUser); 
router.get("/admin/users",loginProtect, getAllUser); 
router.get("/admin/users/:id",loginProtect, getUserId); 
router.delete("/admin/user/:id",loginProtect, deleteUserById); 
//favs
router.get("/user/favorite/like/:id",loginProtect, getFavoritesByUser);
router.post("/user/favorites",loginProtect, addToFavorite); 
router.delete("/user/favorites/:favorites_id",loginProtect, removeFavorites) //chequear tabla de favoritos 

//address
router.post("/user/address",loginProtect,setAddress)
router.put("/user/address/:postal_code",loginProtect,updateAddress) // deberia ser id..pero id es el codigo postal D:
router.delete("/user/address/:postal_code",loginProtect,removeAddress)

export default router;