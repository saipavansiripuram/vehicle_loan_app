const User = require("../models/userModel");
const { generateToken } = require("../authUtils");

const bcrypt = require('bcryptjs');
const saltRounds = 10;

// const getUserByEmailAndPassword = async (req, res) => {
//   try {
//     const user = await User.findOne({
//       email: req.body.email,
//       password: req.body.password,
//     });
//     if (user) {
//       const token = generateToken(user._id);
//       res.status(200).json({ token ,userData:user });
//       // res.status(200).json({ token });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const addUser = async (req, res) => {
//   try {
//     const newuser = await User.create(req.body);
//     res.status(200).json({ message: "Success" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
async function addUser(req, res) {
  try {
      const data = req.body;
      let userList = [];
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
          return res.status(400).json({ error: true, message: 'Email already exists' });
      }
      userList.push(data)
      for (let index = 0; index < userList.length; index++) {
          const hashedPassword = await bcrypt.hash(userList[index].password, saltRounds);
          userList[index].password = hashedPassword;
      }
      await User.insertMany(userList)
      return res.status(201).json({ data: null, error: false, message: "User Registration Successfull" });
  } catch (error) {
      res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
}



async function getUserByEmailAndPassword(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ error: true, message: 'Not Found' });
  }
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ error: true, message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ error: true, message: 'Password do not match' });
      }
      const token = generateToken(user._id, user.role);
      res.json({ token, userData: user });
  } catch (error) {
      res.status(400).json({ error: true, message: 'Internal server error' });
  }
}



const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getUserByEmailAndPassword, addUser, getAllUsers }
