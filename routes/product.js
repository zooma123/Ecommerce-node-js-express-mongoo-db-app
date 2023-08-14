const express  = require ('express') 
const productrouter = express.Router();
const {createproduct, GetAllproduct ,UpdateProduct ,DeleteProduct , GetProduct ,SearchByNameandCategory } = require("../controllers/productCtl.js") 
const { protect } = require('../controllers/authCtl.js') ;
const  {restrictTo} = require('../controllers/authCtl.js') ;
const upload = require("../utils/multer.js");
const {alias} = require("../controllers/productCtl.js")
const  { check} = require ("./../controllers/authCtl.js") 

productrouter.get('/'  ,GetAllproduct )
productrouter.post('/'  , protect, restrictTo('admin'), upload.single("image") , createproduct) 
productrouter.get('/NameandCategory/:key' , SearchByNameandCategory) 
productrouter.delete('/:id'  ,protect, restrictTo('admin'),DeleteProduct)
productrouter.get('/:id'  ,  GetProduct) 
productrouter.patch('/:id'  , protect, restrictTo('admin'),UpdateProduct)






module.exports = productrouter ;