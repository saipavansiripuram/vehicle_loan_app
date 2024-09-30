const express = require('express');
const router = express.Router();
const loanApplicationController = require('../controllers/loanApplicationController');
const { validateLoanApplication } = require('../utils/validateSchema');
const {validateToken} = require('../authUtils')

const validateLoanApplicationMiddleware = (req, res, next) => {
    const { error } = validateLoanApplication(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  };



router.get('/getAllLoanApplications', loanApplicationController.getAllLoanApplications);
router.get('/getLoanApplicationsByUserId/:id', loanApplicationController.getLoanApplicationsByUserId);
router.get('/getLoanApplicationById', loanApplicationController.getLoanApplicationById);
// router.post('/addLoanApplication',validateLoanApplicationMiddleware,loanApplicationController.addLoanApplication);
router.post('/addLoanApplication',validateToken,loanApplicationController.addLoanApplication);
router.put('/updateLoanApplication/:id',validateToken, loanApplicationController.updateLoanApplication);
router.delete('/deleteLoanApplication/:id', validateToken,loanApplicationController.deleteLoanApplication);

module.exports = router;
