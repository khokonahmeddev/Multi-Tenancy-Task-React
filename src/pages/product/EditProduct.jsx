import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {PRODUCTS} from "../../services/endpoints";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        quantity: ""
    });

    const [preloader, setPreloader] = useState(false);
    const [error, setError] = useState(null);
    const [pageLoading, setPageLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setPageLoading(true);
                const { data } = await axiosInstance.get(`${PRODUCTS}/${id}`);
                setFormData({
                    name: data.name,
                    price: data.price,
                    quantity: data.quantity
                });
            } catch (error) {
                toast.error("Error fetching product data");
            } finally {
                setPageLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setPreloader(true);
        axiosInstance.put(`${PRODUCTS}/${id}`, formData)
            .then(({ data }) => {
                toast.success(data.message);
                navigate('/products'); // Redirect to products page after successful update
            }).catch(({ response }) => {
            if (response?.status === 422) {
                setError(response.data.errors);
            } else {
                toast.error(response.data.message);
            }
        }).finally(() => setPreloader(false));
    };

    return (
        <div className="container mt-5">
            <h4>Edit Product</h4>
            {pageLoading && <div className="spinner-border text-primary" role="status"></div>}
            {
                !pageLoading && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text"
                                   className="form-control"
                                   id="name"
                                   placeholder="Product Name"
                                   name="name"
                                   value={formData.name}
                                   onChange={handleChange}
                                   required
                            />
                            {error && error.name && <small className="text-danger">{error.name}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number"
                                   className="form-control"
                                   id="price"
                                   placeholder="Product Price"
                                   name="price"
                                   value={formData.price}
                                   onChange={handleChange}
                                   required
                            />
                            {error && error.price && <small className="text-danger">{error.price}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input type="number"
                                   className="form-control"
                                   id="quantity"
                                   placeholder="Product quantity"
                                   name="quantity"
                                   value={formData.quantity}
                                   onChange={handleChange}
                                   required/>
                            {error && error.quantity && <small className="text-danger">{error.quantity}</small>}
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={preloader}>
                            {preloader && <span className="spinner-border spinner-border-sm me-2"></span>}
                            Submit
                        </button>
                    </form>
                )
            }
        </div>
    );
};

export default EditProduct;
