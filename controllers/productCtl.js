 const  Product = require ("../modules/Product.js") ;
 const jwt = require ("jsonwebtoken") 
 const {promisify} = require('util');
 const {cloudinary} = require('../utils/cloudinary.js')



exports.createproduct = async(req,res) =>{

  const { nameofproduct, brand, category,description , rating , countinstock ,price} = await req.body;

  try {
    
     
    const result = await cloudinary.uploader.upload(req.file.path);
  
        const product = new Product({
          nameofproduct,
          brand,
          category, 
          description,
          price, 
          rating, 
          countinstock,
          image: result.secure_url,
          cloudinary_id: result.public_id,
          
        });
        var savedProduct = await product.save();        
        res.status(200).send(savedProduct);
      }
    
   catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

exports.alias = (req,res,next)=>{
  req.query.limit = '3';
  
  req.query.fields = 'name,price,summary,difficulty'
  next();
  
  }
  



// Method For Get ALL Product

exports.GetAllproduct = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const exluded = ["page", "limit", "fields"];
    exluded.forEach((ele) => delete queryObj[ele]);
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|ls|lse)\b/g,
      (match) => `$${match}` 
    );

    let query = Product.find(JSON.parse(queryString));
    //Sorting

    if (req.query.sort) {
  const sortby = req.query.sort.split(",").join(' ')  ;
    query = query.sort(sortby);
  }else {
query = query.sort('-createdAt')


  }
  /////////////

  if(req.query.fields){

const fields = req.query.fields.split(',').join(' ')
query = query.select(fields);


  }else {
query = query.select('-__v')

  }
/// pagintation
const page = req.query.page * 1 || 1
const limit = req.query.limit *1 || 100
const skip  = (page -1) * limit

query = query.skip(skip).limit(limit);

if(req.query.page){

const numofproducts = await Prdouct.countDocuments();
if(skip >= numofproducts) res.status(404).json({message : "not found page"})

}

    const product = await query;

    res.status(200).json({
      status: "success",
      data: {
     product
      },
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
 
    });
 console.log(err);
  }
};

// Method For Updating Product

exports.UpdateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id ,req.body,{
new : true , 
runValidators :true ,

    });
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
};

// Method For Deleting Product
exports.DeleteProduct = async (req, res) => {
  try {
    const deletedproduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

// Method For Finding One Product  By Id Search For Product 

exports.GetProduct = async (req, res) => {
  try {
    const product =  await Product.findById(req.params.id);
    res.status(200).json({
      message: "Good Here You are The Product",
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

// Search By Name In The Product

exports.SearchByNameandCategory = async (req,res)=>{
 try{ let data = await Product.find({

"$or":[
{"nameofproduct" :{$regex:req.params.key} },
{"category" : {$regex:req.params.key}}
]

  });
  
  res.status(200).json({
message : "Here You Are The Product" , 
product : data

  })

}catch(err){


  res.status(400).json({
    message: err,
    status: "fail",
  });


}
}