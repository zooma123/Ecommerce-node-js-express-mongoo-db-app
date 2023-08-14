const express = require('express') ;
const router = express.Router();
 const  { register , login  , signOut , check} = require ("./../controllers/authCtl.js") 
 const { protect } = require('../controllers/authCtl.js') ;

 router.post("/register" , register)
router.post("/login" , login)
router.post("/logout" , protect , signOut).post("/Checkadminality" , check)


module.exports = router