import React, {useEffect, useState} from "react";
import axiosInstance from "../../services/axios";
import {MY_PROFILE} from "../../services/endpoints";

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(MY_PROFILE);
                setData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])
    return (
        <div className="container mt-5">
            <h1>Welcome to Dashboard</h1>
            {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
                <>
                    <h4>Company Name: {data?.tenant?.name}</h4>
                    <span><b>Name: {data.name}</b></span>
                    <br/>
                    <span><b>Email: {data.email}</b></span>
                </>
            )}

        </div>
    );
};

export default Home;