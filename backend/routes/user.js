const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync();
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const verify = require("../routes/verifyToken");
const multer = require('multer');


dotenv.config();


// Multer File upload settings
const DIR = './avatar/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
    }
  });
  
  // Multer Mime Type Validation
  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });
  

// user Registration
router.post('/register', upload.single('avatar'),async (req,res, next)=>{
  const url = req.protocol + '://' + req.get('host')
  // Create a New User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    about:req.body.about,
    social:req.body.social,
    userRole: req.body.userRole,
    password: req.body.password,
    avatar: url + '/avatar/' + req.file.filename
  });

    // Check Email
        const emailExist= await User.findOne({
            email:req.body.email
        });
        if(emailExist) return res.status(400).send("Email Already Exist");

    // Hash Password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPass = await bcrypt.hash(req.body.password,salt)

      try{
        const savedUser = await user.save()
        res.send(savedUser);
      }catch(error){
        res.status(400).send(error)
      }
})



// Single User
router.get("/:email", async (req, res) => {
  try{
    const users = await User.findOne({email: req.params.email});
    res.json(users);
  }catch(error){

  }
});

// Get All Users
router.get("/", async (req, res) => {
  try{
      const users = await User.find();
      res.json(users);
  }catch(error){
      res.json({message:error})
  }
});



// user Login
router.post('/login', async (req,res)=>{
    try{
        // Check Email
        const emailExist= await User.findOne({
            email:req.body.email});
        if(!emailExist) return res.status(400).send("Email does not Exist");
          
        // Check Password
        const passExist= await User.findOne({
            password:req.body.password});
        if(!passExist) return res.status(400).send("Invalid Password");
        
        const user = await User.find({
            email:req.body.email
        })
            const token = jwt.sign({ 
              user
            }, process.env.TOKEN_SECRET);
            res.header("auth-token", token).send({ token: token });

            

    }catch(error){
        res.status(400).send(error);
    }
})


module.exports = router;