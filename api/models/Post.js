// Model for the posts

const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
// setting the timestamps will save the timestamps of the operations

module.exports = mongoose.model("Post", PostSchema);
