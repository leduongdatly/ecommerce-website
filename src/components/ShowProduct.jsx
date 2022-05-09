import React from "react";
import { Link } from "react-router-dom";
import productData from "../utils/products";
import vietnameseCurrency from "../utils/currency";

const ShowProduct = ({ title, data, count }) => {
    return (
        <section className="product__container">
            <div className="grid wide">
                <div className="product__container-title">
                    <h3 className="product__container-title-heading">{title}</h3>
                </div>
                <div className="row">
                    {
                        productData.getProducts(data, count).map((item, index) => {
                            const newPrice = item.price - (item.price * (item.sale / 100))
                            return (
                                <div className="col l-3 m-4 c-6" key={index}>
                                    <Link to={`/catalog/${item.slug}`} className="product__container-detail">
                                        <div className="product__container-detail-img">
                                            <img src={item.avatar} alt={item.name} />
                                        </div>
                                        <div className="product__container-detail-desc">
                                            <h4 className="product__container-detail-desc-name">{item.name}</h4>
                                            <div className="product__container-detail-desc-price">
                                                <span className="product__container-detail-desc-price-old">{vietnameseCurrency(item.price)}</span>
                                                <span className="product__container-detail-desc-price-current">{vietnameseCurrency(newPrice)}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default ShowProduct