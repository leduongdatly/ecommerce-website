import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Helmet from "../../components/Helmet";
import { getAllBrandRequest } from "../../redux/actions/BrandsAction";
import { getAllCartRequest } from "../../redux/actions/CartAction";
import { getAllColorRequest } from "../../redux/actions/ColorsAction";
import { getAllProductRequest } from "../../redux/actions/ProductsAction";
import { getAllSizeRequest } from "../../redux/actions/SizesAction";
import { getAllUserRequest } from "../../redux/actions/UserAction";
import Brand from "./Brand";
import Color from "./Color";
import Home from "./Home";
import Size from "./Size";
import Product from "./Product";
import ProductForm from "../../components/admin/ProductForm";

const Admin = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductRequest());
        dispatch(getAllBrandRequest());
        dispatch(getAllColorRequest());
        dispatch(getAllSizeRequest());
        dispatch(getAllUserRequest());
        dispatch(getAllCartRequest());
    }, []);

    return (
        <Helmet title="admin">
            <div className="admin">
                <div className="grid wide">
                    <div className="row">
                        <Sidebar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="color-manage" element={<Color />} />
                            <Route path="brand-manage" element={<Brand />} />
                            <Route path="size-manage" element={<Size />} />
                            <Route path="product-manage" element={<Product />} />
                            <Route path="product-manage/add" element={<ProductForm />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default Admin