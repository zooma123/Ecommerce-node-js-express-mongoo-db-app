const  express = require ("express");
const  { protect, restrictTo } = require ("../controllers/authCtl.js") ;
const userrouter = express.Router();
const {getAllUsers , getUserById , deleteUser ,SearchByName } = require  ('../controllers/UserController.js')

userrouter
  .get("/", protect, restrictTo("admin"), getAllUsers)
  .get("/:id", protect, restrictTo("admin"), getUserById)
  .delete("/:id" , protect, restrictTo("admin"), deleteUser);

userrouter.get("/Name/:key",  SearchByName);
module.exports=  userrouter;
