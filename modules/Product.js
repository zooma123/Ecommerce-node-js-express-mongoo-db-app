const mongoose = require ("mongoose") ;
const {Schenma } = require ("mongoose")


const ProductSchema = new mongoose.Schema({

  nameofproduct:{
type:String ,
required : true ,

  }
, 

image:{
  type : String
}, 
  

  brand:{
    type:String ,
    required : true ,
    
      }
    , 
    
  
    category:{
      type:String ,
      required : true ,
      
        }
      , 
      
    description:{
      type:String ,
      required : true ,
      
        }
      ,
      rating:{
type : Number , 
default : 0 

      } ,
      price:{
        type : Number , 
        required : true ,
        default : 0 
        
              } ,
              countinstock:{
                type : Number , 
                required : true ,
                default : 0 
                
                      }  , 
                      cloudinary_id: {
                        type: String,
                      },

                    Reviews :[{ type: mongoose.Schema.Types.ObjectId , required:false  , ref: 'review' }]
                              
    
    




} , {timestamps : true}
)



module.exports = mongoose.model("product" , ProductSchema)
