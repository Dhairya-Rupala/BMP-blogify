const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
    return;
  } catch (err) {
    res.status(500).json("Something Went Wrong");
    return;
  }
});

//UPDATE POST with specific post id
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {

        // finding the post by specific id and updating it
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
        return;
      } catch (err) {
        res.status(500).json("Something Went Wrong");
        return;
      }
    } else {
      res.status(401).json("You can update only your post!");
      return;
    }
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post Deleted Successfully");
        return;
      } catch (err) {
        res.status(500).json("Something Went Wrong");
        return;
      }
    } else {
      res.status(401).json("You can delete only your post");
      return;
    }
  } catch (err) {
    res.status(500).json("Something Went Wrong");
    return;
  }
});

//GET POST with specific id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
    return;
  } catch (err) {
    res.status(500).json("Something Went Wrong");
    return;
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username && catName) {
      posts = await Post.find({
        username: username,
        categories:catName
      })
    }
    else if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories:catName
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
    return;
  } catch (err) {
    res.status(500).json("Something Went Wrong");
    return;
  }
});

module.exports = router;
