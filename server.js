const express = require("express");
const  mongoose = require("mongoose");
const http = require("http");
const url = require("url");
const  cors = require ("cors") ;
const  dotenv = require ("dotenv") ;
const auth = require ("./routes/auth.js")
const product = require  ("./routes/product.js");
const  user = require  ("./routes/user.js")
const order  = require  ("./routes/order.js")
const cart = require ("./routes/cart.js")
const review = require('./routes/review.js')
dotenv.config();
const app = express();
app.use(cors());
 app.use(express.json())
 app.use(express.urlencoded({extended :true}))
 
 //MiddleWare Method For Get The Time For Any Action
 app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  
  next();
  })

//Validation
 
app.use("/api/auth" , auth);
app.use('/api/product' , product)
app.use('/api/users' , user)
app.use('/api/cart' , cart)
app.use('/api/order' , order)
app.use('/api/review' , review)

 app.all("*" , (req,res,next)=>{
  res.status(404).json({
  
  
  status : "fail" ,
  message : `Cant Find ${req.originalUrl} on This Server`
  
  })
  
  
  })
  
  
  

// Connect To Mongo Db 
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true, 
}).then(con=>{
console.log("Connected To Data Base")
  
})




















const port = process.env.PORT;


app.listen(port, () =>{

console.log(`app is  Running on ${port}`);

});