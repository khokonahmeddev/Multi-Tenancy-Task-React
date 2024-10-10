//import logo from './logo.svg';
//import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from "./route/PrivateRoute";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import AlreadyLogin from "./route/AlreadyLogin";
import Navbar from "./component/Navbar";
import Product from "./pages/product/Product";
import {getToken} from "./utilities/token";
import AddProduct from "./pages/product/AddProduct";
import EditProduct from "./pages/product/EditProduct";
import Register from "./pages/Auth/Register";

const App = () => {
    let isAuthenticated = !!getToken();

    return (
        <Router>
            <div className="App">
                <ToastContainer/>
                {isAuthenticated && <Navbar/>}
                <Routes>
                    <Route element={<AlreadyLogin/>}>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Route>
                    <Route path="/dashboard" element={<PrivateRoute element={Home}/>}/>
                    <Route path="/products" element={<PrivateRoute element={Product}/>}/>
                    <Route path="/add-product" element={<PrivateRoute element={AddProduct}/>}/>
                    <Route path="/edit-product/:id" element={<PrivateRoute element={EditProduct}/>}/>
                </Routes>
            </div>
        </Router>);
};

export default App;
