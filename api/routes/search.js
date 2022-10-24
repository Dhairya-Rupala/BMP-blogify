const router = require("express").Router();
const Post = require("../models/Post");

//GET SEARCHED POSTS
router.get("/", async (req, res) => {
    let posts;
    console.log(req.query.searchTitle)
    if (!req.query.searchTitle) {
        try {
            posts = await Post.find()
            res.status(200).json(posts)
            return;
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
  try {
    posts = await Post.find({
        $text: {
            $search:req.query.searchTitle
        }
    });
    console.log(posts)
    res.status(200).json(posts);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router