// src/pages/product/Product.js
import React, {useEffect, useState} from 'react';
import axiosInstance from "../../services/axios";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {PRODUCTS} from "../../services/endpoints";

const Product = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`${PRODUCTS}?page=${page}`);
            setData(response.data.data);
            setCurrentPage(response.data.current_page);
            setTotalPages(response.data.last_page);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handelDelete = (item) => (e) => {
        e.preventDefault();
        const confirmDelete = window.confirm(`Are you sure you want to delete the product`);
        if (confirmDelete) {
            axiosInstance.delete(`${PRODUCTS}/${item.id}`)
                .then(({data}) => {
                    toast.success(data.message);
                    fetchData();
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        }
    };

    return (
        <div className="container">
            <div className="mt-5">
                <h4>Product List</h4>
                <Link to={'/add-product'} className="btn btn-primary">Add Product</Link>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                <table className="table mt-5">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>
                                <Link to={`/edit-product/${item.id}`} className="btn btn-primary">Edit</Link>
                                <button className="btn btn-danger ms-2" onClick={handelDelete(item)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {totalPages > 10 &&
                    <nav>
                        <ul className="pagination">
                            {[...Array(totalPages).keys()].map((page) => (
                                <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                                    <button
                                        className="page-link"
                                        key={page + 1}
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={currentPage === page + 1}>
                                        {page + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                }
            </div>
        </div>
    );
};

export default Product;
