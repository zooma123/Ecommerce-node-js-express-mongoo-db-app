const  User = require ("../modules/User.js") ;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      status: "success",
      data: {users} ,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail"
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: "Great The User Is Here",

      data: user,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      status: "fail",
    });
  }
};

exports.deleteUser =  async(req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      status: "fail",
    });
  }
};

exports.SearchByName = async (req, res) => {
  try {
let Word = req.params 
let searchin = Word.toString();
    let data = await User.find({
name : {$regex : searchin }
    });

    res.status(200).json({
      message: "Here You Are The User",
      user: data,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      status: "fail",
    });
  }
};
