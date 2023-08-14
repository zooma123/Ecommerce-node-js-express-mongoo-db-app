const  mongoose = require ("mongoose") ;
const reviewSchema = new mongoose.Schema({ 


  userid: { type : mongoose.Schema.Types.ObjectId ,
  required : true , 
ref : "user"  } ,


  productid :{
    type:mongoose.Schema.Types.ObjectId , 
    required : [true, 'Buying Must Belong To a product' ], 
    ref :'product',
  },
  

  content : {
type : String ,
required : false

  }
}, {timestamps : true})




module.exports =  mongoose.model("review" , reviewSchema)