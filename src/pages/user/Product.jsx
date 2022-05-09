import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../../components/Helmet";
import ProductView from "../../components/ProductView";
import ShowProduct from "../../components/ShowProduct";

import productData from "../../utils/products";

const Product = () => {

    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState(null);

    const { slug } = useParams();

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("products"));
        if (data) {
            setProducts(data);
            const item = productData.getProductBySlug(data, slug);
            if (item) {
                setProduct(item);
            }
        }
    }, [slug]);

    React.useEffect(() => {
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
                <ShowProduct title="Sản phẩm liên quan" data={products} count={4} />
            </div>
        </Helmet>
    )
}

export default Product