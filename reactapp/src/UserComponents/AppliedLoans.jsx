import React, { useState, useEffect } from 'react'
import { getData, deleteData } from '../apiConfig'
import { Link } from 'react-router-dom'

const AppliedLoans = () => {
  const [data, setData] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [error, setError] = useState(null);
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : '12345678';
  const userName = user ? user.userName : 'DemoUser';
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterLoans();
  }, [searchTerm, data]);

  const fetchData = async () => {
    try {
      const result = await getData(`/loanApplication/getLoanApplicationsByUserId/${userId}`);
      setData(result);
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  const filterLoans = () => {
    const filtered = data.filter((loan) =>
      loan.loanType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLoans(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLoans = filteredLoans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const openModal = (id) => {
    setSelectedLoanId(id);
  };

  const handleDelete = async () => {
    try {
      if (selectedLoanId) {
        await deleteData(`/loanApplication/deleteLoanApplication/${selectedLoanId}`);
        fetchData();
        setSelectedLoanId(null);
      }
    } catch (error) {
      setError('Failed to delete data');
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className='text-center'>Applied Loans</h1>
        <input
          type="text"
          placeholder="Search..."
          className="form-control mb-3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
       <div className='table-responsive'>
        <table className="table table-bordered">
          <thead className="thead bg-primary ">
            <tr>
              <th scope="col">Loan Type</th>
              <th scope="col">Submission Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentLoans.map((item) => (
              <tr key={item._id}>
                <td>{item.loanType}</td>
                <td>{item.submissionDate}</td>
                <td>{item.loanStatus === 0 ? 'Approved' : item.loanStatus === 1 ? 'Pending' : 'Rejected'}</td>
                <td>
                  <button className="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => openModal(item._id)} >Delete</button>
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
      </div>
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">

            <button type="button" className='close d-flex flex-row-reverse mr-2 mt-2' data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-body text-center">
              Are you sure you want to delete?
            </div>

            <div className="modal-footer text-center d-flex flex-row justify-content-center">
              <button type="button" className="btn btn-danger" onClick={handleDelete} data-dismiss="modal" >Yes, Delete
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <p className='invisible'>Logout</p>
    </div>
  )
}

export default AppliedLoans