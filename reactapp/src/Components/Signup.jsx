import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../userSlice';

const Signup = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        if (!form.username) newErrors.username = 'User Name is required';
        if (!form.email) newErrors.email = 'Email is required';
        if (!form.password) newErrors.password = 'Password is required';
        if (!form.mobile) newErrors.mobile = 'Mobile Number is required';
        if (!form.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            try {
                const result = await dispatch(register({
                    userName: form.username,
                    email: form.email,
                    mobile: form.mobile,
                    password: form.password,
                    role: form.role
                })).unwrap();
                if (result) {
                    navigate('/');
                }
            } catch (err) {
                setErrors({ form: err.message || 'Signup failed' });
            }
        }
    };

    return (
        <section className="container gradient-form rounded">
            <div className=" py-4" >
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black" style={{ backgroundColor: '#eee' }}>
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <form onSubmit={handleSubmit}>
                                            <h1 className='text-center font-bold'>Signup</h1>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="username">Username</label>
                                                <input type="text" id="username" name="username" value={form.username}
                                                    onChange={handleChange}
                                                    className="form-control" placeholder="Username" />
                                                {errors.username && <p className="text-danger">{errors.username}</p>}
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <input type="email" id="email" name="email" value={form.email}
                                                    onChange={handleChange}
                                                    className="form-control" placeholder="Email" />
                                                {errors.email && <p className="text-danger">{errors.email}</p>}
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="mobile">Mobile</label>
                                                <input type="text" id="mobile" name="mobile" value={form.mobile}
                                                    onChange={handleChange}
                                                    className="form-control" placeholder="Mobile Number" />
                                                {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="password">Password</label>
                                                <input type="password" id="password" name="password" value={form.password}
                                                    onChange={handleChange}
                                                    className="form-control" placeholder="Password" />
                                                {errors.password && <p className="text-danger">{errors.password}</p>}
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                                <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword}
                                                    onChange={handleChange}
                                                    className="form-control" placeholder="Confirm Password" />
                                                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="role">Role</label>
                                                <select name="role" id="role" onChange={handleChange} value={form.role} className="btn bg-white dropdown-toggle ml-2" aria-label=".form-select-sm example">
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>

                                            {errors.form && <p className="text-danger text-center">{errors.form}</p>}

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" type="submit" disabled={loading}>
                                                    {loading ? 'Signing up...' : 'Submit'}
                                                </button>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 mr-2">Already have an account? </p>
                                                <Link to="/"><span className="text-primary" style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer' }}> Login</span></Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center" style={{ backgroundColor: '#002147' }}>
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h1 className="mb-4">VehicleVault</h1>
                                        <p className="small mb-0">Financial success is a journey, and the first step is applying for the loan.</p>
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

export default Signup;