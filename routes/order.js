const  express = require ('express') ;
const orderrouter = express.Router();
const { protect, restrictTo } = require ('../controllers/authCtl.js') ;
const  {getCheckoutSession} = require ('../controllers/OrderController.js') 
const {CreateOrderCheck} = require('../controllers/OrderController')
const {getorder} = require('../controllers/OrderController.js')
const {CancelTheOrder} = require("../controllers/OrderController.js")
const {getallorders} = require("../controllers/OrderController.js")
orderrouter.post('/checkout-session', getCheckoutSession )
orderrouter.get('/' , getallorders)

orderrouter.get('/:id' , protect, getorder)
orderrouter.delete('/:id' ,  protect ,CancelTheOrder)


  









module.exports  = orderrouter ;