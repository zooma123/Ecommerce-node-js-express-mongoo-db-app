const reviewmodel = require('../modules/Reviews.js')
const productmodel = require('../modules/Product.js')



exports.CreateReview = async (req,res)=>{

try{
  const productid = await req.body.productid
  const Review = await reviewmodel.create({

userid : req.body.userid,
productid : productid,
content : req.body.content
  })

  
  var Reviewid = Review._id
const product =  await productmodel.findOne({_id : productid });
const ReviewsOfProdcut = product.Reviews || []
let UpdatedReviews = [...ReviewsOfProdcut,Reviewid]
if (!product) {
  return res.status(404).json({ message: "Product not found" });
}

product.Reviews = UpdatedReviews

await product.save();


res.status(200).json({
  message : "Successfullly Make A Review"
})

}catch(err){


res.status(404).json({

message : err.message


})

}}


exports.getallReviewForPrdouct = async (req,res)=>{

  try{
const product = await productmodel.findById(req.params.id).select('Reviews -_id');
   const reviews = await product.populate('Reviews' , 'userid content -_id')
  
    res.status(200).json({
reviews
    })
  
  }catch(err){
  
  
  res.status(404).json({
  
  message : err.message
  
  
  })
  
  }
}
  
        






