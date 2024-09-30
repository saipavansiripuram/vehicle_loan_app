import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AdminNavbar.css'
import toast, { Toaster } from 'react-hot-toast';

const AdminNavbar = () => {
    const naviagate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))
    const userName = user ? user.userName : 'Admin'

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        toast('Successfully Logged out!', {
            style: {
                marginTop: "20px"
            },
            icon: '↪',
        });
        setTimeout(() => {
            naviagate('/')
        }, 2000)
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary bg-gradient">
                <Toaster
                    position="top-right"
                    marginTop="20px"
                />
                <div className="container">
                    <Link className="navbar-brand font-weight-bold" to="/admin/home" >VL HUB</Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item mx-auto">
                                <span className="navbar-text text-white text-sm p-2 font-weight-light " id='admin'>{`Admin / ${userName}`}</span>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/home" >Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Loan
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/admin/viewloan">Loans</Link>
                                    <Link className="dropdown-item" to="/admin/loanform">Add Loan</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/loanrequest">Loans Requested</Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger ml-4" data-toggle="modal" data-target="#logoutModal" >Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
            {/* modal */}
            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="logoutModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" className='close d-flex flex-row-reverse mr-2 mt-2' data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="modal-body text-center">
                            Are you sure you want to Logout?
                        </div>

                        <div className='text-center rounded-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                            </svg>
                        </div>
                        <div className="modal-footer text-center d-flex flex-row justify-content-center">
                            <button type="button" className="btn btn-success" onClick={handleLogout} data-dismiss="modal" >Yes, Logout</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdminNavbar