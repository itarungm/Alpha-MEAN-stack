const express = require("express");
const app=express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser')
dotenv.config();

// Connect MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false},()=>console.log("Connected to DB"));

// Import Routes
const postRoutes = require("./routes/post");

const port = process.env.PORT || 4000;
app.use(cors({origin:'*'}))


// Make "public" Folder Publicly Available
app.use('/uploads', express.static('uploads'));
app.use('/avatar', express.static('avatar'));

// app.get('/',(req,res)=>{
//   res.send('Working')
// })
// Using Middleware
app.use("/api/posts",postRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname, 'alpha')));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, 'alpha/index.html'))
})

// Creating Port
app.listen(port,console.log(`Server Started at Port: ${port}`));

// Error
// app.use((req, res, next) => {
//     // Error goes via `next()` method
//     setImmediate(() => {
//       next(new Error('Something went wrong'));
//     });
//   });
  
  app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });