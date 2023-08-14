const express  = require ('express') 
const cartrouter = express.Router();
const CartController = require ('../controllers/CartController')
const  { protect, restrictTo } = require ("../controllers/authCtl.js") ;

cartrouter.post('/:id' , protect, CartController.CreateCart)

cartrouter.get('/AllCarts' ,protect, restrictTo('admin'),CartController.GetallCarts )
cartrouter.get('/' , protect,  CartController.FindUserCart )
cartrouter.delete('/:id'   , protect,CartController.deleteCart)

module.exports = cartrouter