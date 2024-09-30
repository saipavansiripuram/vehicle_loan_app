const jwt = require("jsonwebtoken");
const SECRET_TOKEN = "asdfgewlnclnlhjkl"
const User = require('./models/userModel')

const generateToken = (id) => {
  return jwt.sign({ id }, SECRET_TOKEN, { expiresIn: "1h" });
};




const validateToken = async(req, res, next) => {
  // const token = req.header("Authorization");
  // if (!token) return res.status(400).json({ message: "Access denied. No token provided." });
  // try {
  //   const verified = jwt.verify(token, SECRET_TOKEN);
  //   req.user = verified;
  //   next();
  // } catch (error) {
  //   res.status(400).json({ message: "Authentication failed" });
  // }
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(400).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(400).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_TOKEN);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).send({ data: [], status: "fail", message: 'User not found.' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Token validation error:', error);
    res.status(400).json({ message: 'Invalid token.' });
  }
};
module.exports = { generateToken, validateToken };


