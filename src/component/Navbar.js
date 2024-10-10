import {Link, NavLink} from "react-router-dom";
import React from "react";
import {removeToken} from "../utilities/token";
import {toast} from "react-toastify";
import {removeTenant} from "../utilities/tenant";
import axiosInstance from "../services/axios";
import {LOGOUT} from "../services/endpoints";

const Navbar = () => {

    const handelLogout = () => {
        try {
            const response = axiosInstance.post(LOGOUT)
                removeToken()
                removeTenant()
                toast.success("Logout Successfully");
                window.location.href = '/';
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to={'/dashboard'} className="navbar-brand">Logo</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to={'/dashboard'} className="nav-link" aria-current="page">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/products'} className="nav-link">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link" onClick={handelLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar