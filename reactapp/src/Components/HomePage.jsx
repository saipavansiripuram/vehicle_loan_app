import React, { useState, useEffect } from 'react';
import './HomePage.css';
import toast, { Toaster } from 'react-hot-toast';
import { getData } from '../apiConfig'

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    useEffect(() => {
  
        if (user) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            if (user.role.toLowerCase() === 'user') {
                const result = await getData(`/loanApplication/getLoanApplicationsByUserId/${user._id}`);
                getStatus(result);
                setData(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getStatus = (loanData) => {
        if (user.role.toLowerCase() === 'admin') {
            toast('Check Someone Applied Loan!', {
                position: 'top-right',
                style: {
                    border: '1px solid #713200',
                    padding: '20px',
                    color: '#713200',
                    marginTop: '35px'
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
        } else {
            loanData.forEach(loan => {
                let statusMessage = '';
                switch (loan.loanStatus) {
                    case 0:
                        statusMessage = `Your loan for ${loan.purchasePrice} has been approved.`;
                        break;
                    case 1:
                        statusMessage = `Your loan for ${loan.purchasePrice} is pending approval.`;
                        break;
                    case 2:
                        statusMessage = `Your loan for ${loan.purchasePrice} has been rejected.`;
                        break;
                    default:
                        statusMessage = 'Unknown loan status.';
                        break;
                }
                toast(statusMessage, {
                    position: 'top-right',
                    style: {
                        border: '1px solid #713200',
                        padding: '20px',
                        color: '#713200',
                        marginTop: '35px'
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                });
            });
        }
    };
    return (
        <div>
            <div className="container text-center mt-5 position-relative">
                {/* <Toaster/> */}
                <img
                    src={process.env.PUBLIC_URL + '/loancoverimage.jpg'}
                    alt="Vehicle Loan"
                    style={{ width: '600px', height: '350px' }}
                    className="img-fluid"
                />
                <div className="centered-text">
                    <h2 className="text-white">Vehicle Loan HUB</h2>
                </div>
                <p className="lead mt-3">
                    Applying for a vehicle loan is now easier than ever. Our platform offers a
                    seamless application process, competitive rates, and quick approval. Start your
                    application today and get one step closer to owning your dream vehicle.
                </p>
            </div>

            <footer className="bg-dark text-white text-center py-4 mt-5">
                <pre className='text-white'>Contact Us</pre>
                <pre className='text-white'>Email: vlhub@gmail.com   Phone: 9010121921</pre>

            </footer>
        </div>
    );
}

export default HomePage;
