const mongoose=require('mongoose');

const loanSchema=new mongoose.Schema({
    loanType:{
        type:String,
        required:true,
        index:true
    },
    description:{
        type:String,
        required:true
    },
    interestRate:{
        type:Number,
        required:true
    },
    maximumAmount:{
        type:Number,
        required:true
    }
});

const Loan = mongoose.model('Loan',loanSchema);
module.exports = Loan