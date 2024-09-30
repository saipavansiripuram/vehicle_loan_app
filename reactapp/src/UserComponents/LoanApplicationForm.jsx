import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, postData } from '../apiConfig';

const LoanApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loanData, setLoanData] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    loanType: '',
    submissionDate: Date.now(),
    income: '',
    model: '',
    purchasePrice: '',
    address: '',
    file: '',
    loanStatus: 1,
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
 
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user._id : '12345678';
    const userName = user ? user.userName : 'DemoUser';

    setFormData((prevData) => ({
      ...prevData,
      userId: userId,
      userName: userName,
    }));

    if (id) {
      fetchLoanData();
    }
  }, [id]);

  const fetchLoanData = async () => {
    try {
      const loan = await getData(`/loan/${id}`);
      setLoanData(loan);
      setFormData((prevData) => ({
        ...prevData,
        loanType: loan.loanType || '',
      }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, message: 'Error fetching loan data' }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.income) {
      newErrors.income = 'Income is required';
    } else if (formData.income < 100000) {
      newErrors.income = 'Income must be above 1,00,000';
    }
  
    if (!formData.model) newErrors.model = 'Model is required';
  
    if (!formData.purchasePrice) {
      newErrors.purchasePrice = 'Purchase Price is required';
    } else if (formData.purchasePrice <= 10000) {
      newErrors.purchasePrice = 'Purchase Price must be more than 10,000';
    }
  
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.file) newErrors.file = 'Proof is required';
  
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      try {
        await postData('/loanApplication/addLoanApplication', formData);
        setShowSuccessModal(true);
      } catch (error) {
        console.error('Error submitting loan application:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    // setFormData({ ...formData, proof: e.target.files[0] });
    const proof = e.target.files[0];
    if (proof) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          file: reader.result
        });
      };
      reader.readAsDataURL(proof);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/loans');
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary" onClick={() => navigate('/loans')}>Back</button>
      <h3 className="text-center mt-3">Loan Application Form</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label>Income:<span className="text-danger">*</span></label>
          <input
            type="number"
            name="income"
            className={`form-control ${errors.income ? 'is-invalid' : ''}`}
            value={formData.income}
            onChange={handleInputChange}
          />
          {errors.income && <div className="invalid-feedback">{errors.income}</div>}
        </div>

        <div className="form-group">
          <label>Model:<span className="text-danger">*</span></label>
          <input
            type="date"
            name="model"
            className={`form-control ${errors.model ? 'is-invalid' : ''}`}
            value={formData.model}
            onChange={handleInputChange}
          />
          {errors.model && <div className="invalid-feedback">{errors.model}</div>}
        </div>

        <div className="form-group">
          <label>Purchase Price:<span className="text-danger">*</span></label>
          <input
            type="text"
            name="purchasePrice"
            className={`form-control ${errors.purchasePrice ? 'is-invalid' : ''}`}
            value={formData.purchasePrice}
            onChange={handleInputChange}
          />
          {errors.purchasePrice && <div className="invalid-feedback">{errors.purchasePrice}</div>}
        </div>

        <div className="form-group">
          <label>Address:<span className="text-danger">*</span></label>
          <input
            type="text"
            name="address"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        <div className="form-group">
          <label>Proof:<span className="text-danger">*</span></label>
          <input
            type="file"
            name="file"
            className={`form-control ${errors.file ? 'is-invalid' : ''}`}
            onChange={handleFileChange}
          />
          {errors.file && <div className="invalid-feedback">{errors.file}</div>}
        </div>

        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>

   

      {showSuccessModal && (
        <div className="modal show" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Success</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Your loan application has been submitted successfully!</p>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
      )}
      <p className='invisible'>Logout</p>
    </div>
  );
};

export default LoanApplicationForm;