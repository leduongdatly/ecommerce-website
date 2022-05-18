import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Helmet from "../../components/Helmet";
import ProductView from "../../components/ProductView";
import ShowProduct from "../../components/ShowProduct";

import productData from "../../utils/products";

const Product = () => {

    const productRedux = useSelector((state) => state.products.products);

    // const [products, setProducts] = useState([]);

    const [product, setProduct] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        // let data = JSON.parse(localStorage.getItem("products"));
        if (productRedux) {
            // setProducts(productRedux);
            const item = productData.getProductBySlug(productRedux, slug);
            if (item) {
                setProduct(item);
            }
        }
    }, [slug]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [product]);

    return (
        <Helmet title={slug}>
            <div className="product">
                <ProductView product={product} />
                <ShowProduct title="Sản phẩm liên quan" data={productRedux} count={4} brand={product && product.brand} />
            </div>
        </Helmet>
    )
}

export default Product