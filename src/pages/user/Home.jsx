import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner1 from "../../assets/images/banner/banner-1.jpg";
import banner2 from "../../assets/images/banner/banner-2.png";
import Banner from "../../components/Banner";
import Helmet from "../../components/Helmet";
import Policy from "../../components/Policy";
import ShowProduct from "../../components/ShowProduct";
import SlickSlider from "../../components/SlickSlider";
import { useAuth } from "../../context/UserAuthContext";
import { getAllProductRequest } from "../../redux/actions/ProductsAction";

const Home = () => {

    const { currentUser } = useAuth();

    const dispatch = useDispatch();

    // const [products, setProducs] = useState([]);
    const productsRedux = useSelector((state) => state.products.products);
    const brandsRedux = useSelector((state) => state.brands.brands);
    const colorsRedux = useSelector((state) => state.colors.colors);
    const sizesRedux = useSelector((state) => state.sizes.sizes);
    const usersRedux = useSelector((state) => state.users.users);
    const cartsRedux = useSelector((state) => state.carts.carts);

    // useEffect(() => {
    //     const productsData = JSON.parse(localStorage.getItem("products"));
    //     if (productsData && productsData.length > 0) {
    //         setProducs(productsData.length > productsRedux.length ? productsData : productsRedux);
    //     }
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem("products", JSON.stringify(productsRedux));
    //     localStorage.setItem("brands", JSON.stringify(brandsRedux));
    //     localStorage.setItem("colors", JSON.stringify(colorsRedux));
    //     localStorage.setItem("sizes", JSON.stringify(sizesRedux));
    //     localStorage.setItem("users", JSON.stringify(usersRedux));

    //     if (currentUser) {
    //         localStorage.setItem("carts", JSON.stringify(cartsRedux));
    //     }
    // }, [productsRedux, brandsRedux, colorsRedux, sizesRedux, usersRedux, cartsRedux]);

    useEffect(() => {
        dispatch(getAllProductRequest());
    }, []);

    return (
        < Helmet title="Trang chủ" >
            <div className="home">
                {/* begin slider */}
                <SlickSlider autoPlay={true} speed={1000} autoPlayTime={7000} data={null} />
                {/* end slider */}

                {/* begin policy */}
                <Policy />
                {/* end policy */}

                {/* begin show product */}
                <ShowProduct title="Sản phẩm mới" data={productsRedux} count={4} />
                {/* end show product */}

                {/* begin banner */}
                <Banner img={banner1} />
                {/* end banner */}

                {/* begin show product */}
                <ShowProduct title="Sản phẩm liên quan" data={productsRedux} count={4} />
                {/* end show product */}

                {/* begin banner */}
                <Banner img={banner2} />
                {/* end banner */}
            </div>
        </Helmet >
    )
}

export default Home