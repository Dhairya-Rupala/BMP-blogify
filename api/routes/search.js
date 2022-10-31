const router = require("express").Router();
const Post = require("../models/Post");

//GET SEARCHED POSTS
router.get("/", async (req, res) => {
  let posts;
  let searchTitle = req.query.searchTitle;
  try {
    if (searchTitle == "") {
      try {
        const filteredPosts = await Post.find();
        res.status(200).json(filteredPosts)
        return;
      }
      catch (err) {
        res.status(500).json(err)
        return;
      }
    }
    const filteredPosts = await Post.aggregate([
      {
        "$search": {
          "index": "searchTitle",
          "wildcard": {
            "query": `*${searchTitle}*`,
            "path":"title"
          }
        }
      }
    ])
    res.status(200).json(filteredPosts)
    return;
  }
  catch (err) {
    res.status(500).json("Can Not Fetch the posts")
    return;
  }
});

module.exports = router