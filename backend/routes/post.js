const router = require("express").Router();
const verify = require("../routes/verifyToken");
const Post = require("../model/Post");
const multer = require('multer');

// Multer File upload settings
const DIR = './uploads/'; 

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


// Add New listing

router.post("/",verify,upload.single('avatar'), async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const post = new Post({
    title: req.body.title,
    desc: req.body.desc,
    author: req.body.author,
    category: req.body.category,
    created_at: req.body.created_at,
    avatar: url + '/uploads/' + req.file.filename,
    token: req.body.token
  });

  try {
    const savedPost = await post.save();
    res.send(savedPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get All posts

router.get("/", async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(error){
        res.json({message:error})
    }
});

// Single post
router.get("/:postId", async (req, res) => {
  try{
    const posts = await Post.findById(req.params.postId);
    res.json(posts);
  }catch(error){

  }
});

// Update post
router.put("/:postId",verify, async (req, res) => {
  try{
      const posts ={
        title: req.body.title,
        desc: req.body.desc,
        author: req.body.author
        // created_at: req.body.created_at,
        // avatar: req.file.filename
      };
      const updatedPost = await Post.findOneAndUpdate({_id: req.params.postId},posts);
      res.json(updatedPost)
  }
  catch(error){
    res.json({message:error})
  }
});

// Delete post
router.delete("/:postId",verify, async (req, res) => {
  try{
    const posts = await Post.findByIdAndRemove(req.params.postId);
    res.json(posts)
  }catch(error){
    res.json({message:error})
  }
});

module.exports = router;