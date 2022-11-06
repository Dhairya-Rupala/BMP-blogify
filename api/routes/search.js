const router = require("express").Router();
const Post = require("../models/Post");

//GET SEARCHED POSTS
router.get("/", async (req, res) => {
  let searchTitle = req.query.searchTitle;
  try {

    // if the searchTitle is empty then return all the posts
    if (searchTitle == "") {
      try {
        const filteredPosts = await Post.find();
        res.status(200).json(filteredPosts)
        return;
      }
      catch (err) {
        res.status(500).json("Something Went Wrong")
        return;
      }
    }

    // searching the posts with the search index 
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