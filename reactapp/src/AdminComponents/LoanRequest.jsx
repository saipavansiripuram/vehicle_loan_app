import React, { useState, useEffect } from 'react';
import { getData, putData } from '../apiConfig';

const LoanRequest = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  useEffect(() => {
    fetchLoans();
  }, []);

  useEffect(() => {
    filterLoans();
  }, [filterStatus, loans]);

  const fetchLoans = async () => {
    try {
      const result = await getData('/loanApplication/getAllLoanApplications');
      setLoans(result);
    } catch (error) {
      setError('Failed to fetch loan requests');
    }
  };

  const filterLoans = () => {
    if (filterStatus === 'All') {
      setFilteredLoans(loans);
    } else {
      const statusMap = {
        Pending: 1,
        Approved: 0,
        Rejected: 2,
      };
      const filtered = loans.filter(
        (loan) => loan.loanStatus === statusMap[filterStatus]
      );
      setFilteredLoans(filtered);
      setCurrentPage(1);
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLoans = filteredLoans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleApprove = async (loanId) => {
    await updateLoanStatus(loanId, 'Approved');
  };

  const handleReject = async (loanId) => {
    await updateLoanStatus(loanId, 'Rejected');
  };

  const updateLoanStatus = async (loanId, status) => {
    try {
      const statusMap = {
        Approved: 0,
        Pending: 1,
        Rejected: 2,
      };
      await putData(`/loanApplication/updateLoanApplication/${loanId}`, { loanStatus: statusMap[status] });
      // Update the loan status in the state
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan._id === loanId ? { ...loan, loanStatus: statusMap[status] } : loan
        )
      );
    } catch (error) {
      setError('Failed to update loan status');
    }
  };

  const handleShowMore = (loan) => {
    setSelectedLoan(loan);
    console.log(loan)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLoan(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Loan Requests for Approval</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          placeholder="Search..."
          className="form-control w-25"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            setFilteredLoans(
              loans.filter(
                (loan) =>
                  loan.userName?.toLowerCase().includes(searchTerm) ||
                  loan.loanType?.toLowerCase().includes(searchTerm)
              )
            );
          }}
        />
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Filter by Status: {filterStatus}
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            onClick={(e) => setFilterStatus(e.target.getAttribute('data-status'))}
          >
            <button className="dropdown-item" data-status="All">
              All
            </button>
            <button className="dropdown-item" data-status="Pending">
              Pending
            </button>
            <button className="dropdown-item" data-status="Approved">
              Approved
            </button>
            <button className="dropdown-item" data-status="Rejected">
              Rejected
            </button>
          </div>
        </div>
      </div>
      <div className='table-responsive'>
      <table className="table table-striped table-bordered table-hover">
        <thead className="bg-primary text-white">
          <tr>
            <th>Username</th>
            <th>Loan Type</th>
            <th>Model</th>
            <th>Submission Date</th>
            <th>Purchase Price</th>
            <th>Income</th>
            <th>Status</th>
            <th>Preview</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentLoans.map((loan) => (
            <tr key={loan._id}>
              <td>{loan.userName}</td>
              <td>{loan.loanType}</td>
              <td>{loan.model}</td>
              <td>{loan.submissionDate}</td>
              <td>{loan.purchasePrice}</td>
              <td>{loan.income}</td>

              <td>
                {loan.loanStatus === 0
                  ? 'Approved'
                  : loan.loanStatus === 1
                    ? 'Pending'
                    : 'Rejected'}
              </td>
              <td>
                <button
                  className="btn btn-sm mr-2 text-center"
                  onClick={() => handleShowMore(loan)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                  </svg>
                </button>
              </td>
              <td className='d-flex justify-content-around'>

                {loan.loanStatus === 1 && (
                  <>
                    <button
                      className="btn btn-sm btn-success mr-2"
                      onClick={() => handleApprove(loan._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn  btn-sm  btn-danger"
                      onClick={() => handleReject(loan._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {loan.loanStatus === 0 && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleReject(loan._id)}
                  >
                    Reject
                  </button>
                )}
                {loan.loanStatus === 2 && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleApprove(loan._id)}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="pagination-controls">
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            </li>
            {[...Array(totalPages).keys()].map(pageNumber => (
              <li key={pageNumber + 1} className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(pageNumber + 1)}>{pageNumber + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Loan Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Address:</strong> {selectedLoan?.address}
                </p>
                <p>
                  <strong>Proof:</strong>
                </p>
                <img
                  src={selectedLoan?.file}
                  alt="Proof"
                  className="img-fluid"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>

      )}
      <p className='invisible'>Logout</p>

    </div>
  );
};

export default LoanRequest;


































































































