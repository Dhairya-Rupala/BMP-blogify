const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// it validates the password requirements 
const password_validator = (passwd) => {
  return passwd.length >= 8;
}

// it verifies the digits in the phone 
const phn_validator = (phn) => {
    phn = phn.replace(/\D/g, ''); // get rid of all non-digits
    if (phn.length == 10) {
        return true;
    }
    return false;
}

//UPDATE
router.put("/:id", async (req, res) => {

  // checking if the user updating the profile is the same as 
  // the user is logged in 
  if (req.body.userId === req.params.id) {

    // if the request contains the password updation 
    if (req.body.password) {
      if (!password_validator(req.body.passwd)) {
        res.status(400).json("The password should contain 8 or more characters")
        return;
      }

      // hashing the password 
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      // checking if the username is empty or not 
      if (req.body.username == "" || !req.body.username) {
        res.status(400).json("Username can not be empty")
        return;
      }

      if (!!req.body.phoneNumber) {
        const phn = req.body.phoneNumber.phone;
        if (phn!="" && !phn_validator(phn)) {
          res.status(400).json("Please Enter correct phone number")
          return;
        }
      }

      // updating the user with the given information 
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  } else {
    res.status(401).json("You can update only your account!");
    return;
  }
});

//GET USER with specific ID 
router.get("/:id", async (req, res) => {
  try {
    // finding the user with specific id
    const user = await User.findById(req.params.id);

    // not sending the password on the frontend 
    const { password, ...others } = user._doc;
    res.status(200).json(others);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});


// fetch the user with the username 
router.get("/", async (req, res) => {
  try {
    const user = await User.find({ username: req.query.username })
    return res.status(200).json(user)
  }
  catch (err) {
    return res.status(500).json(err)
  }
})
module.exports = router;
