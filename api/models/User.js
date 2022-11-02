// Model for the users 

const mongoose = require("mongoose");

const PhoneNumberSchema = new mongoose.Schema({
  label: {
    type: String,
    required:true
  },
  id: {
    type: String,
    required:true
  },
  dialCode: {
    type: String,
    required:true
  },
  phone: {
    type: String,
    required:true
  }
})

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: [PhoneNumberSchema],
      required:false
    },
    batch: {
      type: Number,
      required:false,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
