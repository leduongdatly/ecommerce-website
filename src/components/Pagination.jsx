import React from "react";
import { Link } from "react-router-dom";
import vietnameseCurrency from "../utils/currency";

const Pagination = ({ products }) => {
    return (
        <div className="row">
            {
                products.map((item, index) => {
                    const newPrice = item.price - (item.price * (item.sale / 100))
                    return (
                        <div className="col l-3 m-4 c-6" key={index}>
                            <Link to={`${item.slug}`} className="product__container-detail">
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
    )
}

export default Pagination