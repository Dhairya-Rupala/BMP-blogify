const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    
    // generating the salt and hashed password 
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const userWithEmail = await User.find({ email: req.body.email })
    if (userWithEmail.length!=0) {
      res.status(500).json("Email Already Exists")
      return;
    }

    const userWithUserName = await User.find({ username: req.body.username })
    if (userWithUserName.length!=0) {
      res.status(500).json("Username already Exists")
      return;
    }

    const user = await newUser.save();
    res.status(200).json(user);
    return;
  } catch (err) {
    res.status(500).json("Something Went Wrong");
    return;
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
            res.status(500).json("Please Enter valid username")
            return;
    }

    // if the user is found 
        const validated = await bcrypt.compare(req.body.password, user.password)
        if (!validated) {
            res.status(500).json("Wrong Password")
            return;
        }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
    return;
  } catch (err) {
    res.status(500).json("Something Went wrong");
    return;
  }
});

module.exports = router;
