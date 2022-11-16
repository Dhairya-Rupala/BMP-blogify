const router = require("express").Router();
const Tags = require("../models/Tags");

// get method serving all the tags
router.get("/", async (req, res) => {
    try {
      const tags = await Tags.find();
      res.status(200).json(tags);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  });

module.exports = router;