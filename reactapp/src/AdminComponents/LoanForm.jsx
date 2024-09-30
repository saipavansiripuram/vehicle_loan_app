import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, putData, postData } from '../apiConfig';
import toast, { Toaster } from 'react-hot-toast';


const LoanForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loanType, setLoanType] = useState('');
  const [description, setDescription] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [maximumAmount, setMaximumAmount] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      fetchLoanData();
    }
  }, [id]);

  const fetchLoanData = async () => {
    try {
      const loan = await getData(`/loan/${id}`);
      setLoanType(loan.loanType);
      setDescription(loan.description);
      setInterestRate(loan.interestRate);
      setMaximumAmount(loan.maximumAmount);
    } catch (error) {
      setMessage('Error fetching loan data');
    }
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!loanType) {
      newErrors.loanType = 'Loan Type is required';
    } else if (loanType.length < 3) {
      newErrors.loanType = 'Loan Type must be at least 3 characters long';
    }

    if (!description) {
      newErrors.description = 'Description is required';
    } else if (description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    if (!interestRate) {
      newErrors.interestRate = 'Interest Rate is required';
    } else if (isNaN(interestRate) || parseFloat(interestRate) <= 0) {
      newErrors.interestRate = 'Interest Rate must be a positive number';
    }

    if (!maximumAmount) {
      newErrors.maximumAmount = 'Maximum Amount is required';
    } else if (isNaN(maximumAmount) || parseFloat(maximumAmount) <= 10000) {
      newErrors.maximumAmount = 'Maximum Amount must be greater than 10000';
    }

    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateInputs();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const loanData = {
        loanType,
        description,
        interestRate,
        maximumAmount,
      };

      try {
        if (id) {
          const response = await putData(`/loan/${id}`, loanData);
          if (response) {
            setMessage('Loan updated successfully!');
            toast.success("Loan updated successfully!");
          } else {
            setMessage('Failed to update loan.');
            toast.error('Failed to update loan.');
          }
        } else {
          const response = await postData('/loan', loanData);
          if (response) {
            toast.success("Loan Added successfully!");
            setMessage('Loan created successfully!');
            setLoanType('');
            setDescription('');
            setInterestRate('');
            setMaximumAmount('');
          } else {
            setMessage('Failed to create loan.');
            toast.error('Failed to add loan.');
          }
        }
        navigate('/admin/viewloan');
      } catch (error) {
        setMessage('Error: ' + error.message);
      }
    }
  };

  return (

    <div className="container w-100 text-center mt-5 border rounded border-5 p-5">
      <Toaster
        position="top-right"
      />
      <h2>{id ? 'Edit Loan' : 'Create New Loan'}</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center">
        <div className="form-group col-md-4">
          <label htmlFor="loanType">Loan Type <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control border-top-0 border-left-0 border-right-0"
            id="loanType"
            placeholder="Enter loan type"
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}

          />
          {errors.loanType && <div className="text-danger">{errors.loanType}</div>}
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="description">Description <span className="text-danger">*</span></label>
          <textarea
            className="form-control border-top-0 border-left-0 border-right-0"
            id="description"
            rows="3"
            placeholder="Enter loan description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}

          ></textarea>
          {errors.description && <div className="text-danger">{errors.description}</div>}
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="interestRate">Interest Rate <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control border-top-0 border-left-0 border-right-0"
            id="interestRate"
            placeholder="Enter interest rate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}

          />
          {errors.interestRate && <div className="text-danger">{errors.interestRate}</div>}
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="maximumAmount">Maximum Amount <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control border-top-0 border-left-0 border-right-0"
            id="maximumAmount"
            placeholder="Enter maximum amount"
            value={maximumAmount}
            onChange={(e) => setMaximumAmount(e.target.value)}

          />
          {errors.maximumAmount && <div className="text-danger">{errors.maximumAmount}</div>}
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update Loan' : 'Add Loan'}</button>
      </form>
      {message && <div className="mt-3 text-danger">{message}</div>}
      <p className='invisible'>Logout</p>

    </div>
  );
};

export default LoanForm;

