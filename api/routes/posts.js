const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    if (req.body.title && req.body.title.trim() == '') {
      res.status(400).json("The title can not be empty")
      return;
    }
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
        if (req.body.title && req.body.title.trim() == '') {
          res.status(400).json("The title can not be empty")
          return;
        }
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
    const post = await Post.findById(req.params.id).populate({
      path: "comments",
      populate: {
        path: "user_id",
        model: "User",
        select: { _id: 1, username: 1, profilePic: 1 },
      },
    });
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
  const searchTitle = req.query.searchTitle;
  let filteredPosts = [];
  try {
    let posts = [], titleSearchPosts = [];
    if (username && catName) {
      posts = await Post.find({
        username: username,
        categories: catName
      })
    }
    else if (username) {
      posts = await Post.find({
        username: username,
      })
    }
    else if (catName) {
      posts = await Post.find({
        categories: catName
      })
    }
    else{
      posts = await Post.find()
    }
    if (searchTitle) {
      // titleSearchPosts = await Post.aggregate([
      // {
      //   "$search": {
      //     "index": "title_search",
      //     "wildcard": {
      //       "query": `*${searchTitle?.trim()}*`,
      //       "path": "title"
      //     }
      //   }
      // }
      // ])
      titleSearchPosts = await Post.find({
        title: {
          $regex: searchTitle,
          $options:"$i"
        }
      })
    }
    if (searchTitle) {
      for (let i = 0; i < titleSearchPosts.length; i++){
        for (let j = 0; j < posts.length; j++){
          if (titleSearchPosts[i]._id.equals(posts[j]._id)) {
            filteredPosts.push(posts[j])
          }
        }
      }
    }
    else {
      filteredPosts = posts;
    }
    res.status(200).json(filteredPosts)
    
  }
  catch (err) {
    res.status(500).json("Something Went Wrong")
    return;
  }
});

// route for the like and dislike 
router.put("/like/:post_id/:user_id", async (req, res) => {
  try {
    const username = req.params.user_id;
    const postID = req.params.post_id;
    const findPost = await Post.findById(postID);
    const index = findPost.likes.indexOf(username);
    if (index >= 0) {
      findPost.likes.splice(index, 1);
    } else {
      findPost.likes.push(username);
    }
    await findPost.save();
    return res.status(200).json(findPost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/comment/:post_id", async (req, res) => {
  try {
    const comment = { ...req.body, post_id: req.params.post_id };
    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: comment.post_id },
        { $push: { comments: comment } },
        { returnOriginal: false }
      ).populate({
        path: "comments",
        populate: {
          path: "user_id",
          model: "User",
          select: { _id: 1, username: 1, profilePic: 1 },
        },
      });
      return res.status(200).json(updatedPost);
    } catch (err) {
      return res.status(500).json("Could not add the comment");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/comment/:post_id/:comment_id", async (req, res) => {
  try {
    const deletePost = await Post.findOneAndUpdate(
      { _id: req.params.post_id },
      { $pull: { comments: { _id: req.params.comment_id } } },
      { returnOriginal: false }
    ).populate({
      path: "comments",
      populate: {
        path: "user_id",
        model: "User",
        select: { _id: 1, username: 1, profilePic: 1 },
      },
    });
    return res.status(200).json(deletePost);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});


module.exports = router;
