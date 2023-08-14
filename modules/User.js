const mongoose = require  ("mongoose");
const validator = require ('validator')
const bcrypt =  require  ('bcryptjs')
const userSchema = new mongoose.Schema({

name : {  type:String ,  required : [true, "Please Tell Us Your Name"]}, 

email:{ type: String ,  required : [true , "Please Provide Your Email"]
,unique : true ,
lowercase :true ,
validate : [validator.isEmail, 'please Provide a email'] } ,
password: {type :String ,required: [true , 'Please provide a Password'] , minlength: 8 , select :false},

avatar:  {type:String , default: "" } , 
role: {type : String , enum:["user" , "admin"] , default: "user" } , 
tokens : [{type : Object}],
phoneNumber : {type:String ,required : [true , "Please Provide Your PhoneNumber"]}


//Adding Cart For User


},

{
  timestamps: true , 
},


)
userSchema.methods.correctPassword = async function(candidatePassword , userPassword){
  return await bcrypt.compare(candidatePassword,userPassword)
  
  }
  

module.exports =  mongoose.model('user' , userSchema);