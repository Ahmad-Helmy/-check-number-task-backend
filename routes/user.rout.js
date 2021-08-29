const express=require('express')
const router =express.Router()
const User=require('../models/user.model')
const bcrypt = require('bcrypt')

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user)
        return res
          .status(401)
          .json({ message: "email or password are incorrect" });
  
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword)
        return res
          .status(401)
          .json({ message: "email or password are incorrect" });

      const token = user.generateAuthToken();
      res.status(200).json({ token,user });
    } catch (error) {
      res.status(400).json(error);
    }
});
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const isUserRegisterd = await User.findOne({ email });
      if (isUserRegisterd) {
        return res.status(400).json({ message: "email already registerd" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = new User({
        username,
        email,
        password: hashPassword,
      });
      await user.save();
      const token = user.generateAuthToken();
      res.status(200).json({ token,user });
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports=router