import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../apiConfig';

const ViewAllLoans = () => {
    const [data, setData] = useState([]);
    const [filteredLoans, setFilteredLoans] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterLoans();
    }, [searchTerm, data]);

    const fetchData = async () => {
        try {
            const result = await getData('/loan');
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
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLoans = filteredLoans.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center">Available Vehicle Loans</h2>
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
                            <th>Loan Type</th>
                            <th>Loan Description</th>
                            <th>Interest Rate</th>
                            <th>Maximum Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLoans.map(loan => (
                            <tr key={loan._id}>
                                <td>{loan.loanType}</td>
                                <td>{loan.description}</td>
                                <td>{loan.interestRate}</td>
                                <td>{loan.maximumAmount}</td>
                                <td>
                                    <Link to={`/loanapplicationform/${loan._id}`}>
                                        <button className='btn btn-primary'>Apply</button>
                                    </Link>
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
            <p className='invisible'>Logout</p>
        </div>

    );
};

export default ViewAllLoans;
