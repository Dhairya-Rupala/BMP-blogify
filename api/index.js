// creating express server
const cors = require("cors");
const express = require("express");
const app = express();


// dotenv module for the process envs 
const dotenv = require("dotenv");
dotenv.config();

// connecting to the mongodb database
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
  })
  .then(console.log("Successfully connected to the database..."))
  .catch((err) => console.log(err));

// multer module for storing the images
const multer = require("multer");

// path for manipulating the paths
const path = require("path");

// importing the route paths
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const searchRoute = require("./routes/search");
const tagsRoute = require("./routes/tags");

// using the json middleware 
app.use(express.json());
// using the multer for storing the images on disk storage
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors());


// setting up the configuration for the multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
// upload object helping to upload the image 
const upload = multer({ storage });

// post request for uploading the image, consists api route and the callback
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// setting up the api routes 
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/search", searchRoute);
app.use("/api/tags", tagsRoute);


// server at port 5000
app.listen("5000", () => {
  console.log("Server connected successfully...");
});
