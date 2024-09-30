import React from 'react'
import Login from './Components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage'
import Signup from './Components/Signup'
import ViewLoans from './AdminComponents/ViewLoans'
import ErrorPage from './Components/ErrorPage'
import LoanForm from './AdminComponents/LoanForm'
import AppliedLoans from './UserComponents/AppliedLoans'
import LoanRequest from './AdminComponents/LoanRequest'
import ViewAllLoans from './UserComponents/ViewAllLoans'
import LoanApplicationForm from './UserComponents/LoanApplicationForm'
import PrivateRoute from './Components/PrivateRoute'


export default function App() {
    return (
        <div>
            <Router>
                {/* <AdminNavbar />  */}
                <Routes>
                    {/* public routes */}
                    <Route path='/register' element={<Signup />}></Route>
                    <Route path="/" element={<Login />} />


                    {/* private */}
                    {/* Admin Components */}
                    <Route path="/admin/home" element={<PrivateRoute><HomePage/></PrivateRoute>} />
                    <Route path="/admin/loanform" element={<PrivateRoute><LoanForm /></PrivateRoute>} />
                    <Route path="/admin/loanform/:id" element={<PrivateRoute><LoanForm /></PrivateRoute>} />
                    <Route path="/admin/loanrequest" element={<PrivateRoute><LoanRequest /></PrivateRoute>} />
                    <Route path="/admin/viewloan" element={<PrivateRoute><ViewLoans/></PrivateRoute>} />

                    {/* user */}
                    {/* User Components */}
                    <Route path="/loanapplicationform" element={<PrivateRoute><LoanApplicationForm/></PrivateRoute>} />
                    <Route path="/loanapplicationform/:id" element={<PrivateRoute><LoanApplicationForm/></PrivateRoute>} />
                    <Route path="/apploan" element={<PrivateRoute><AppliedLoans/></PrivateRoute>} />
                    <Route path="/loans" element={<PrivateRoute><ViewAllLoans/></PrivateRoute>} />
                    <Route path="/home" element={<PrivateRoute><HomePage/></PrivateRoute>} />
                    <Route path="*" element={<ErrorPage />} />

                </Routes>
            </Router>

        </div>
    )
}

