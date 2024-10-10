import React, {useState} from "react";
import axiosInstance from "../../services/axios";
import {toast} from "react-toastify";
import {PRODUCTS} from "../../services/endpoints";


const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        quantity: ""
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
        axiosInstance.post(PRODUCTS, formData)
            .then(({data}) => {
                toast.success(data.message);
                setFormData({
                    name: "",
                    price: "",
                    quantity: ""
                })
            }).catch(({response}) => {
            if (response?.status === 422) {
                setError(response.data.errors);
            } else {
                toast.error(response.data.message);
            }
        }).finally(() => setPreloader(false));

    }

    return (
        <div className="container mt-5">
            <h4>Add Product</h4>
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
        </div>
    );
};

export default AddProduct;