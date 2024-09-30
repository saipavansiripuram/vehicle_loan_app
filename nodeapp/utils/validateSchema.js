const Joi = require('joi');

const validateUser = (user) => {
    const schema = Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
    });

    return schema.validate(user);
};

const validateLoan = (data) => {
    const schema = Joi.object({
        loanType: Joi.string().required(),
        description: Joi.string().required(),
        interestRate: Joi.number().required(),
        maximumAmount: Joi.number().required(),
    });

    return schema.validate(data)
}


const validateLoanApplication = (data) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        userName: Joi.string().required(),
        loanType: Joi.string().required(),
        submissionDate: Joi.date().required(),
        income: Joi.number().required(),
        model: Joi.date().required(),
        purchasePrice: Joi.number().required(),
        loanStatus: Joi.number().required(),
        address: Joi.string().required(),
        file: Joi.string().required(),

    });
    return schema.validateLoanApplication(data);
}

module.exports = {
    validateUser,
    validateLoan,
    validateLoanApplication
};