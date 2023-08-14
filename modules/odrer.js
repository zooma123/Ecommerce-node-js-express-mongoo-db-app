const  mongoose = require ("mongoose") ;
const orderSchema = new mongoose.Schema({


 shippingAddress:{
  type: String ,
  required : true 
 } ,

  
    price:{ // Beacuse The Price Changes For Ever
      type:Number ,
      required : true ,
      default: 0
        }
      ,

      ispayed:{
        type : Boolean , 
        required : true ,
        default : false, 
        
              } ,
              paidAt:{
                type : Date , 
                
                      } ,
                              




    }, {timestamps : true}
)


module.exports =  mongoose.model("order" , orderSchema)
