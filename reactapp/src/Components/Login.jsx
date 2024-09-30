import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../userSlice';
import './Login.css';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const result = await dispatch(login({ email, password })).unwrap();
                if (result) {
                    const user = result.userData;
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('user', JSON.stringify(user));
                    if (user.role === 'admin') {
                        toast.success('Login Successfull!');
                        setTimeout(() => {
                            navigate('/admin/home');
                        }, 1500)
                    } else {
                        toast.success('Login Successfull!');
                        setTimeout(() => {
                            navigate('/home');
                        }, 1500)
                    }
                }
            } catch (err) {
                setErrors({ form: err.message || 'Login failed' });
            }
        }

    };

    return (
        <section className="gradient-form rounded-xl" style={{ backgroundColor: '#eee' }}>
            <Toaster
                position="top-right"
            />
            <div className="container py-4 h-100 rounded-xl">
                <div className="row d-flex justify-content-center align-items-center h-100 rounded-xl">
                    <div className="col-xl-10">
                        <div className="card rounded-xl text-black">
                            <div className="row g-0">
                                <div className="col-lg-6 d-flex align-items-center" style={{ backgroundColor: '#002147' }}>
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h1 className="mb-4">VehicleVault</h1>
                                        <p className="small mb-0">Financial success starts with applying for a loan.</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <form onSubmit={handleSubmit}>
                                            <h1 className="text-center font-bold">Login</h1>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="form2Example11">Email</label>
                                                <input
                                                    type="text"
                                                    id="form2Example11"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="form-control"
                                                    placeholder="Email"
                                                />
                                                {errors.email && <p className="text-danger">{errors.email}</p>}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="form2Example22">Password</label>
                                                <input
                                                    type="password"
                                                    id="form2Example22"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="form-control"
                                                    placeholder="Password"
                                                />
                                                {errors.password && <p className="text-danger">{errors.password}</p>}
                                            </div>
                                            {errors.form && <p className="text-danger">{errors.form}</p>}
                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button className="btn btn-primary btn-lg" type="submit" disabled={loading}>
                                                    {loading ? 'Logging in...' : 'Login'}
                                                </button>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 mr-2">Don't have an account ?</p>
                                                <Link to="/register">
                                                    <span className="text-primary" style={{ color: 'blue', textDecoration: 'none' }}>Signup</span>
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

