import React, { useState, useEffect } from 'react';
import { getData, deleteData } from '../apiConfig';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ViewLoans = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [selectedLoanId, setSelectedLoanId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchTerm, data]);

    const fetchData = async () => {
        try {
            const result = await getData('/loan');
            setData(result);
            setFilteredData(result);
        } catch (err) {
            setError('Failed to fetch data');
        }
    };

    const filterData = () => {
        const filtered = data.filter((item) =>
            item.loanType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const openModal = (id) => {
        setSelectedLoanId(id);
    };

    const handleDelete = async () => {
        try {
            if (selectedLoanId) {
                await deleteData(`/loan/${selectedLoanId}`);
                fetchData();
                setSelectedLoanId(null);
                toast.success(`Deleted the loan of ${selectedLoanId}`);
            }
        } catch (error) {
            setError('Failed to delete data');
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">

            <h1 className='text-center'>Vechile Loans</h1>
            <input
                type="text"
                placeholder="Search..."
                className="form-control mb-4 w-25"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div className='table-responsive'>
                    <table className="table table-bordered">
                        <thead className="thead bg-primary ">
                            <tr>
                                <th scope="col">Loan Type</th>
                                <th scope="col">Maximum Amount</th>
                                <th scope="col">Interest Rate</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.loanType}</td>
                                    <td>{item.maximumAmount}</td>
                                    <td>{item.interestRate}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <Link to={`/admin/loanform/${item._id}`}>
                                            <button className="btn btn-primary mr-2">Edit</button>
                                        </Link>
                                        <button className="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => openModal(item._id)}>Delete</button>
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
                            <button type="button" className="btn btn-danger" onClick={handleDelete} data-dismiss="modal">Yes, Delete</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <p className='invisible'>Logout</p>
        </div>
    );
};

export default ViewLoans;