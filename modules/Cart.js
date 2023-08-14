const  mongoose = require ("mongoose") ;
const cartSchema = new mongoose.Schema({ 
userId: { type : mongoose.Schema.Types.ObjectId ,
  required : true , 
ref : "user"  } ,

  productid :{
    type:mongoose.Schema.Types.ObjectId , 
    required : [true, 'Buying Must Belong To a product' ], 
    ref :'product',
  },

  quantity : {

type : Number , 
default :  1 

  } , 

  subtotal :{

type : Number ,
required : true ,
  } , 


}, {timestamps : true})




module.exports =  mongoose.model("cart" , cartSchema)