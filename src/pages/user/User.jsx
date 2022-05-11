import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProtectedUserRoute from "../../components/ProtectedUserRoute";
import Reset from "../../components/Reset";
import { useAuth } from "../../context/UserAuthContext";
import { getAllBrandRequest } from "../../redux/actions/BrandsAction";
import { getAllCartRequest } from "../../redux/actions/CartAction";
import { getAllColorRequest } from "../../redux/actions/ColorsAction";
import { getAllProductRequest } from "../../redux/actions/ProductsAction";
import { getAllSizeRequest } from "../../redux/actions/SizesAction";
import { getAllUserRequest } from "../../redux/actions/UserAction";
import Cart from "./Cart";
import Catalog from "./Catalog";
import Home from "./Home";
import Login from "../Login";
import Product from "./Product";
import Register from "../Register";

function User() {

    const dispatch = useDispatch();
    const { currentUser } = useAuth();

    useEffect(() => {
        // dispatch(getAllProductRequest());
        // dispatch(getAllBrandRequest());
        dispatch(getAllColorRequest());
        dispatch(getAllSizeRequest());
        dispatch(getAllUserRequest());
        dispatch(getAllCartRequest());
    }, [])

    return (
        <>
            <Header />

            <div className="container">
                <div className="main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="catalog" element={<Catalog />} />
                        <Route path="catalog/:slug" element={<Product />} />
                        <Route path="register" element={<ProtectedUserRoute><Register /></ProtectedUserRoute>} />
                        <Route path="login" element={<ProtectedUserRoute><Login /></ProtectedUserRoute>} />
                        <Route path="cart" element={currentUser ? <Cart /> : <Navigate to="/login" />} />
                        <Route path="reset" element={<Reset />} />
                        <Route path="accessories" element={<div style={{ textAlign: "center", fontSize: "3rem", lineHeight: 1.6, height: "40vh" }}>Tính năng này đang phát triển :{`((`}</div>} />
                        <Route path="contact" element={<div style={{ textAlign: "center", fontSize: "3rem", lineHeight: 1.6, height: "40vh" }}>Tính năng này đang phát triển :{`((`}</div>} />
                        <Route path="*" element={<div style={{ textAlign: "center", fontSize: "3rem", lineHeight: 1.6, height: "40vh" }}>404 - Trang bạn đến không tồn tại</div>} />
                    </Routes>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default User;
