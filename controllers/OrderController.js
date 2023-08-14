const Product = require("../modules/Product.js");
const Order = require("../modules/odrer.js")
const mongoose = require('mongoose')
const jwt = require ("jsonwebtoken") 
 const {promisify} = require('util');
const stripe = require("stripe")(
  "sk_test_51MumXTJbPEvvxZflxUbbWSYHvBoQykIaha8O8yLEvwZ3YGaUoe9kg5YG5BALMEdFbJvov3LjzvpiOfjjrb9JGTj800jZL8LmOc"
);

exports.getCheckoutSession = async (req, res, next) => {
  // 1) Get The product sold


  try {
  const neworder = await Order.create({
     shippingAddress : req.body.shippingAddress,
     price : req.body.price  ,
     ispayed : "true" 
  }) 

    //2) Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: "http://127.0.0.1:5500/Frontend/pages/User/index.html", // When The Payment Successful The User Will Be Directed To This Url
      // cancel_url: `${req.protocol}://${req.get("host")}/`,
      // client_reference_id: req.params.prdouctid,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${Order.populate('product' , 'nameofproduct')} Product`,
            },
            unit_amount: req.body.price * 100 ,
          },
          quantity: 1,
        },
      ],

      mode: "payment",
    });

    //3) Create Session To Send It TO Client

    return res.status(200).json({
      status: "success",
      session: session,
    });
  } catch (err) {
   return res.status(400).json({
      message: "There is A error",
      err: err.message,
    });
  }
next();
};


exports.getallorders = async(req,res)=>{
try{
  const orders = await Order.find({}).populate('user').populate('product' ,"nameofproduct brand price description" )

res.status(200).json({
message : "here is all The Orders" , 

data : orders

})
}catch(err){

res.status(404).json({
messageoferror : err.message


})
}





}


exports.getorder = async(req,res)=>{
 try{
  const order =  await Order.findById(req.params.id).populate('user').populate('product' , "nameofproduct brand price description")

  res.status(200).json({
message : "Here Is the Order and all Details about it " ,
data : order

  })
 }catch(err){

  return res.status(400).json({
    message: "There is A error",
    err: err.message,
  });
 }
  

}


exports.CancelTheOrder = async(req,res)=>{

try{
const cancelledOrder = await Order.findByIdAndDelete(req.params.id)
res.status(200).json({
message : "Deleted Order Successed",

data :cancelledOrder

})


}catch(err){
res.status(400).json({
message : err.message


})

}



}
