// Schema for the posts

const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    cmt_text: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
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
      required: true,
    },
    likes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    postTags:[String],
    comments: [CommentSchema],
  },
  { timestamps: true }
);
// setting the timestamps will save the timestamps of the operations

module.exports = mongoose.model("Post", PostSchema);
