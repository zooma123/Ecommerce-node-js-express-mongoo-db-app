const express  = require ('express') 
const router = express.Router();
const { protect } = require('../controllers/authCtl.js') ;
const  {restrictTo} = require('../controllers/authCtl.js') ;
const reviewController = require('../controllers/ReviewController.js')
router.post('/createreview' , protect, reviewController.CreateReview)

router.get('/getreview/:id' ,protect, reviewController.getallReviewForPrdouct )









module.exports= router