const LoanApplication = require('../models/loanApplicationModel');

const getAllLoanApplications = async (req, res) => {
    try {
        // const { searchValue, statusFilter, page, sortValue, pageSize, sortBy } = req.query;
        // const skip = (page - 1) * pageSize;

        // const searchQuery = {
        //     $or: [
        //         { applicantName: { $regex: searchValue, $options: 'i' } },
        //         { status: statusFilter }
        //     ]
        // };
        // const sortOption = { [sortBy]: sortValue };

        // const loanapps = await LoanApplication.find(searchQuery).sort(sortOption).skip(skip).limit(pageSize);
        const loanapps = await LoanApplication.find()
        res.status(200).json(loanapps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getLoanApplicationsByUserId = async (req, res) => {
    try {
      const loanapps = await LoanApplication.find({ userId:req.params.id});
        //  const loanapps = await LoanApplication.find(req.params);
        if(loanapps.length == 0){
          return res.status(404).json({message:"No Loan is Associated with that User"});
        }
         res.status(200).json(loanapps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLoanApplicationById = async (req, res) => {
    try {
        const loanapps = await LoanApplication.findById(req.params.id);
        if (loanapps) {
            res.status(200).json(loanapps);
        } else {
            res.status(404).json({ message: 'Cannot find any loan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addLoanApplication = async (req, res) => {
    try {
        const loanapps = await LoanApplication.create(req.body);
        res.status(200).json({ message: 'Added Successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updateLoanApplication = async (req, res) => {
    try {
        const loanapps = await LoanApplication.findByIdAndUpdate(req.params.id, req.body);
        if (loanapps) {
            res.status(200).json({ message: 'Loan Application Updated Successfully' });
        } else {
            res.status(404).json({ message: 'Loan Application Not Found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteLoanApplication = async (req, res) => {
    try {
        const loanapps = await LoanApplication.findByIdAndDelete(req.params.id);
        if (loanapps) {
            res.status(200).json({ message: 'Loan Application Deleted Successfully' });
        } else {
            res.status(404).json({ message: 'Loan Application Not Found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllLoanApplications, getLoanApplicationsByUserId, getLoanApplicationById, addLoanApplication, updateLoanApplication, deleteLoanApplication };
