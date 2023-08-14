const User = require ( "../modules/User.js")
const bcrypt = require ("bcryptjs");
const nodemailer = require  ("nodemailer")
const jwt = require ("jsonwebtoken") 
const {promisify} = require('util');
const { error } = require("console");
const signToken = id=>{

return jwt.sign({ id}, process.env.TOKEN_PASS, {
    expiresIn: "90d",
  });
}




const validEmail = (email)=>{
const re =
/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
return re.test(email);
}
const createSendToken = (user , statusCode , res)=>{
const token = signToken(user._id)
res.cookie('jwt' , token, { //Name Of The Cookie And Content
expires : new Date(Date.now() + process.env.CookieExpire * 24 * 60 *60 * 1000), // Send Cookie to Client
httpOnly : true // prevent Prowser From any Modification
})
 


res.json({
  status: 'ok', data: token
})

}
exports.register =  async (req,res) =>{
  
  const {name,email,password ,phoneNumber} = req.body

const user =  await User.findOne({email});

if(user){
  return res.json({ status: 'error', error: 'User Already Exist' })
}
if(!validEmail(email)){
  return res.json({ status: 'error', error: 'Invalid Email' })


}


if(password.length< 6 ){
  return res.json({
    status: 'error',
    error: 'Password too small. Should be atleast 6 characters'
  })
}


const hashedPassword =  bcrypt.hashSync(password,10);

try{

  const newUser = await User.create({name , email ,password : hashedPassword , phoneNumber  })
  createSendToken(newUser , 201 , res)

 
}catch(error){

  return res.status(401).json({ status: 'error', error: error.message})


}
  
  
}



exports.login = async(req,res,next)=>{
const {email , password} = req.body


//Check if email and Password Exist
if(!email || !password){
  return res.json({ status: 'error', error: 'Invalid username/password' })

next();
}
// Check if the User and Password Correct
const user = await User.findOne({email}).select('+password')

if(!user ||!(await user.correctPassword(password , user.password)) ){
return res.status(401).json({ status: 'error', error: 'Invalid username/password'})
next();
}

const token = signToken(user._id)

let oldTokens = user.tokens || [];

if (oldTokens.length) {
  oldTokens = oldTokens.filter(t => {
    const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
    if (timeDiff < 86400) {
      return t;
    }
  });
}

await User.findByIdAndUpdate(user._id, {
  tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
});

return res.json({ status: 'ok', data: token })
};


exports.protect = async (req,res,next) => {
let token; 

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

   token = await req.headers.authorization.split(" ")[1];
}
if(!token){
 return res.status(401).json({
message : "You Are Not logged In please Login To get Access"
 }) 
}

// Verify Web Token 
try{
  const decoded =  await promisify(jwt.verify) (token , process.env.TOKEN_PASS)
  //Know Wich User Is Login In 
  const currentUser = await User.findById(decoded.id);
  if(!currentUser){
    return res.status(401).json({
message : "This User Does no longer Exist"

    })
  }
  req.user = currentUser;
}catch(err){
return res.status(401).json({
message : "Error In Token Not Valid" , 
error : err.message


})

}

next();
}

exports.restrictTo = (...roles) =>{
return (req,res,next)=>{
if(!roles.includes(req.user.role)){
 
return res.status(403).json({
  message : "You Dont Have The permission To Do That Action"
})

}
next();

}


}



exports.signOut = async (req, res) => {
  try{

    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: 'Authorization fail!' });
      }
  
      const tokens = req.user.tokens;
  
      const newTokens = tokens.filter(t => t.token !== token);
  
      await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
      res.json({ success: true, message: 'Sign out successfully!' });
  }}catch(err){

res.status(400).json({
message : err.message

})
  




  }
  }

  exports.check = async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)   
    if (token) {
      try {
        const decoded = await promisify(jwt.verify) (token , process.env.TOKEN_PASS)

        const  userId  = await decoded.id;
      
        // Retrieve the user data from the database based on the userId
        const user = await User.findById(userId, 'role').exec();
        if (!user) {
          res.status(404).json({ error: 'User not found' });
        } else {
          const isAdmin = user.role === 'admin';
        res.json({ data : isAdmin }) 
          
        }
      } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
      }
    } else {
      res.status(401).json({ error: 'Missing token' });
    }

}

  
