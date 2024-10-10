import React, {useState} from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import {API_BASE_URL} from "../../services/endpoints";
import {Link} from "react-router-dom";

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        company_name: "",
        password: "",
        email: "",
        confirm_password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [preloader, setPreloader] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        setPreloader(true);
        axios.post(`${API_BASE_URL}auth/register`, formData)
            .then(response => {
                toast.success(response.data.message);
                window.location.href = '/login'
            }).catch(({response}) => {
            if (response?.status === 422) {
                setError(response.data.errors);
            } else {
                toast.error(response.data.message);
            }

        }).finally(() => setPreloader(false))
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-sm" style={{width: '28rem'}}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="name"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Enter your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            {error && error.name && <small className="text-danger">{error.name}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="company_name" className="form-label">Company name</label>
                            <input
                                type="company_name"
                                className="form-control"
                                id="company_name"
                                name="company_name"
                                placeholder="Enter your company name"
                                value={formData.company_name}
                                onChange={handleChange}
                                required
                            />
                            {error && error.company_name && <small className="text-danger">{error.company_name}</small>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {error && error.email && <small className="text-danger">{error.email}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {error && error.password && <small className="text-danger">{error.password}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password_confirmation" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password_confirmation"
                                name="password_confirmation"
                                placeholder="Enter your confirmation password"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                required
                            />
                            {error && error.password_confirmation &&
                                <small className="text-danger">{error.password_confirmation}</small>}
                        </div>
                        <Link to='/login'>Back to Login</Link>
                        <button type="submit" className="btn btn-primary w-100" disabled={preloader}>
                            {preloader && <span className="spinner-border spinner-border-sm me-2"></span>}
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register