const router = require("express").Router();
const Category = require("../models/Category");

// get method serving all the categories
router.get("/", async (req, res) => {
    try {
      const cats = await Category.find();
      res.status(200).json(cats);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  });

module.exports = router;
