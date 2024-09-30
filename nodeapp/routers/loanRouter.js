const express = require('express');
const router = express.Router();
const LoanController = require('../controllers/loanController');
const {validateLoan}=require('../utils/validateSchema')
const {validateToken} = require('../authUtils')

const validateLoanMiddleware = (req, res, next) => {
    const { error } = validateLoan(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  };



router.get('/', LoanController.getAllLoans);
router.get('/:id', LoanController.getLoanById);
router.post('/',validateToken, validateLoanMiddleware,LoanController.addLoan);
router.put('/:id',validateToken, LoanController.updateLoan);
router.delete('/:id',validateToken, LoanController.deleteLoan);

module.exports = router;
