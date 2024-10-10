import React, {useState} from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import {setToken} from "../../utilities/token";
import {Link} from "react-router-dom";
import {API_BASE_URL} from "../../services/endpoints";
import {setTenant} from "../../utilities/tenant";

const Login = () => {

    const [formData, setFormData] = useState({
        password: "",
        email: ""
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
        // Add your form submission logic here
        setPreloader(true);
        axios.post(`${API_BASE_URL}auth/login`, formData)
            .then(response => {
                setToken(response.data.access_token)
                setTenant(response.data.tenant)
                toast.success("Login Successfully");
                window.location.href = '/dashboard'
            }).catch(({response}) => {
            if (response?.status === 422) {
                setError(error.response.data.errors);
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
                        <Link to='/register'>Register</Link>
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

export default Login