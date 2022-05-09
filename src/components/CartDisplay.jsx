import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFromCartRequest, getAllCartRequest, updateUserCartQuantityRequest } from "../redux/actions/CartAction";

import vietnameseCurrency from "../utils/currency";

const CartDisplay = ({ data }) => {

    const dispatch = useDispatch();

    const onUpdateQuantity = (type, item) => {
        const id = item.id;
        if (type === "minus") {
            item.quantity = item.quantity - 1 === 0 ? 1 : item.quantity - 1;
            item.price = item.quantity * item.currentPrice;
            dispatch(updateUserCartQuantityRequest(item.quantity, item.price, id, item));
        } else {
            item.quantity = item.quantity + 1;
            item.price = item.quantity * item.currentPrice;
            dispatch(updateUserCartQuantityRequest(item.quantity, item.price, id, item));
        }
    }

    const onDeleteFromCart = (id) => {
        dispatch(deleteFromCartRequest(id));
        // dispatch(getAllCartRequest());
    }

    return (
        <div className="wrap">
            {/* <div className="row"> */}
            <div className="col l-12 m-12 c-12">
                <div className="wrap__item">
                    <div className="wrap__item-img">
                        <img src={data.avatar} alt={data.name} />
                    </div>
                    <div className="wrap__item-detail">
                        <Link to={`/catalog/${data.slug}`}>{data.name} - {data.color} - {data.size}</Link>
                    </div>
                    <div className="wrap__item-price">
                        <p>{vietnameseCurrency(data.price)}</p>
                    </div>
                    <div className="wrap__item-control">
                        <div className="wrap__item-control-btn" onClick={() => onUpdateQuantity("minus", data)}>
                            <i className="fa-solid fa-minus"></i>
                        </div>
                        <div className="wrap__item-control-display">{data.quantity}</div>
                        <div className="wrap__item-control-btn" onClick={() => onUpdateQuantity("plus", data)}>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                    <div className="wrap__item-delete" onClick={() => onDeleteFromCart(data.id)}>
                        <i className="fa-solid fa-trash-can"></i>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default CartDisplay