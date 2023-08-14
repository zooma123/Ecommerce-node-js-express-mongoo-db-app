const Cart = require('../modules/Cart.js');
const Product = require('../modules/Product.js')
const jwt = require ("jsonwebtoken") 
 const {promisify} = require('util');

 exports.CreateCart = async (req,res)=>{
try{

  const newcart =  await Cart.create({
   
    userId : req.body.userId ,
    productid : req.params.id ,
    quantity : req.body.quantity , 
    subtotal : req.body.subtotal * req.body.quantity ,

  });
res.status(200).json({

message : "Success New Cart Has Assigned" , 
data : newcart
})
}catch(error){

res.status(404).json({

error : error.message
})

}
}


exports.GetallCarts = async (req,res)=>{
try{
const Carts =  await Cart.find({});

res.status(200).json({
  Message: "Good Here All Carts",
  data: Carts,
});

}catch(err){
   res.status(400).json({
    message: "There is A error",
    err: err.message,
  });


}
}

exports.deleteCart = async (req,res)=>{
try{

  const deletedCart = await Cart.findByIdAndDelete(req.params.id)
res.status(200).json({
message : "Success You Have Deleted The Cart" ,
data : deletedCart


})

}catch(err){

res.stauts(200).json({

message : err.message ,
status : "fail"

})
}
}

exports.FindUserCart = async (req,res)=>{
try{

  const token = req.headers.authorization.split(' ')[1];
  console.log(token)   
      const decoded = await promisify(jwt.verify) (token , process.env.TOKEN_PASS)

const  userId  = req.body.userId

  const cart = await Cart.find({userId : userId}).populate('productid' ,"nameofproduct category price image")
res.status(200).json({
message : "Here is The Cart" ,
data : cart


})
}catch(err){
  res.status(200).json({
    message : err.message ,
    status : 'fail'
    
    
    })

}
}









 