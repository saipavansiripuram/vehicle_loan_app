const express = require('express')
const router = express.Router();
const usercontroller = require('../controllers/userController')
const { validateToken } = require('../authUtils')
const { validateUser } = require('../utils/validateSchema')



// const validateUserMiddleware = (req, res, next) => {
//     const { error } = validateUser(req.body);
//     if (error) {
//       return res.status(400).send(error.details[0].message);
//     }
//     next();
//   };


router.post('/signup', usercontroller.addUser)
router.post('/login', usercontroller.getUserByEmailAndPassword)
router.get('/', usercontroller.getAllUsers)


module.exports = router