import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartDisplay from '../../components/CartDisplay';
import Helmet from '../../components/Helmet';
import { useAuth } from '../../context/UserAuthContext';
import { getAllCartRequest } from '../../redux/actions/CartAction';
import vietnameseCurrency from '../../utils/currency';

const Cart = () => {

    const { currentUser } = useAuth();

    const cartsRedux = useSelector((state) => state.carts.carts);
    const dispatch = useDispatch();

    // const [carts, setCarts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // useEffect(() => {
    //     if (currentUser) {
    //         localStorage.setItem("carts", JSON.stringify(cartsRedux));
    //     }
    //     const cartsData = JSON.parse(localStorage.getItem("carts"));
    //     if (cartsData.length > 0) {
    //         setCarts(cartsData);
    //     }
    // }, [cartsRedux]);

    useEffect(() => {
        setTotalPrice(cartsRedux.reduce((total, item) => total + Number(item.price), 0))
        setTotalProducts(cartsRedux.reduce((total, item) => total + Number(item.quantity), 0))
    }, [cartsRedux]);

    useEffect(() => {
        dispatch(getAllCartRequest());
    }, []);

    const onBuy = () => {
    }

    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                {
                    cartsRedux.length > 0
                        ?
                        <div className="grid wide">
                            <div className="row">
                                <div className="col l-12 m-12 c-12">
                                    {
                                        cartsRedux.map((item, index) => {
                                            return (
                                                <CartDisplay key={index} data={item} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col l-8"></div>
                                <div className="col l-4 m-12 c-12 text-right">
                                    <div className="cart__right">
                                        <h3 className="cart__right-total-product">Tổng sản phẩm: {totalProducts}</h3>
                                        <p className="cart__right-total-price">Tổng tiền: {vietnameseCurrency(totalPrice)}</p>
                                        <button className="btn btn--primary" onClick={onBuy}>Đặt hàng</button>
                                        <Link to="/catalog" className="btn btn--primary">Tiếp tục mua hàng</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="grid wide">
                            <div className="row">
                                <div className="col l-12 cart__empty">
                                    <h2>Opps giỏ hàng của bạn chưa có gì cả!! Mời bạn <Link to="/catalog">mua hàng</Link></h2>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </Helmet>
    )
}

export default Cart