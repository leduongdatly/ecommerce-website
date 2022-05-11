import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
import { addToUserCartRequest, getAllCartRequest, updateUserCartQuantityRequest } from "../redux/actions/CartAction";
import vietnameseCurrency from "../utils/currency";
import SlickSlider from "./SlickSlider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductView = ({ product }) => {

    const dispatch = useDispatch();
    const cartsRedux = useSelector((state) => state.carts.carts);

    const { currentUser } = useAuth();

    // const [carts, setCarts] = useState([]);
    const [isAvailable, setIsAvailable] = useState(true);
    const [height, setHeight] = useState("300px");
    const [active, setActive] = useState(false);
    const [size, setSize] = useState(undefined);
    const [color, setColor] = useState(undefined);
    const [quantity, setQuantity] = useState(1);

    const content = useRef(null);

    const currentPrice = product ? product.price - (product.price * (product.sale / 100)) : 0

    useEffect(() => {
        setIsAvailable(
            product && product.quantity !== 0 ? true : false
        )
        setQuantity(1);
        setColor(undefined);
        setSize(undefined);
    }, [product]);

    // useEffect(() => {
    //     if (currentUser) {
    //         localStorage.setItem("carts", JSON.stringify(cartsRedux));
    //     }

    //     const cartsData = JSON.parse(localStorage.getItem("carts"));
    //     if (cartsData && cartsData.length > 0) {
    //         setCarts(cartsData);
    //     }
    // }, [cartsRedux]);

    console.log(cartsRedux);

    const onSeeMore = () => {
        setActive(!active)
        setHeight(
            active ? "300px" : `${content.current.scrollHeight}px`
        );
    }

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    const check = () => {
        if (size === undefined) {
            alert('Vui lòng chọn kích cỡ!')
            return false
        }

        if (color === undefined) {
            alert('Vui lòng chọn màu sắc!')
            return false
        }

        return true
    }

    const findData = (data, item) => {
        const x = data.filter((x) => x.uid === item.uid)
        const y = x.find((data) => data.slug === item.slug && data.color === item.color && data.size === item.size)

        if (y) {
            return y
        }

        return false
    }

    const addToCart = () => {
        setQuantity(1);
        setColor(undefined);
        setSize(undefined);
        if (currentUser) {
            if (isAvailable) {
                if (check()) {
                    const newItem = {
                        uid: currentUser.uid,
                        avatar: product.avatar,
                        name: product.name,
                        slug: product.slug,
                        color: color,
                        size: size,
                        currentPrice: currentPrice,
                        quantity: quantity,
                        price: currentPrice * quantity
                    }
                    let a = findData(cartsRedux, newItem)
                    if (a) {
                        const id = a.id;
                        const updatedQuantity = a.quantity + quantity
                        const updatedPrice = updatedQuantity * a.currentPrice
                        const newData = { ...newItem, quantity: updatedQuantity, price: updatedPrice }
                        if (window.confirm("Sản phẩm đã có trong giỏ hàng. Bạn muốn thêm tiếp chứ?")) {
                            dispatch(updateUserCartQuantityRequest(updatedQuantity, updatedPrice, id, newData));
                            toast.success('Cập nhật thành công!', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {
                            setQuantity(1);
                            setColor(undefined);
                            setSize(undefined);
                        }
                    } else {
                        // them
                        dispatch(addToUserCartRequest(newItem));
                        dispatch(getAllCartRequest());
                        toast.success('Thêm thành công!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }
            }
        } else {
            alert("Bạn cần đăng nhập để mua!");
        }
    }

    return (
        product && <div className="product__view">
            <ToastContainer style={{ fontSize: "1.6rem" }} />
            <div className="grid wide">
                <div className="row">
                    <div className="col l-8 m-12 c-12">
                        <div className="product__view-left">
                            <div className="product__view-left-slider">
                                <SlickSlider autoPlay={true} speed={500} autoPlayTime={7000} data={product.img} />
                            </div>
                            <div className="product__view-left-detail-img">
                                <img src={product.detailImg} alt={product.name} />
                            </div>
                        </div>
                    </div>
                    <div className="col l-4 m-12 c-12">
                        <div className="product__view-right">
                            <div className="product__view-right-product">
                                <h3 className="product__view-right-product-name">{product.name}</h3>
                                <div className="product__view-right-product-choose">
                                    <h3>Kích cỡ</h3>
                                    {
                                        product.sizes.map((item, index) => {
                                            return (
                                                <div key={index} className={`product__view-right-product-choose-btn ${size === item.size ? "active" : ""}`} onClick={() => setSize(item.size)}>
                                                    {item.size}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="product__view-right-product-choose">
                                    <h3>Màu sắc</h3>
                                    {
                                        product.colors.map((item, index) => {
                                            return (
                                                <div key={index} className={`product__view-right-product-choose-btn ${color === item.color ? "active" : ""}`} onClick={() => setColor(item.color)}>
                                                    {item.color}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="product__view-right-product-choose">
                                    <h3>Số lượng</h3>
                                    <div className="product__view-right-product-choose-control">
                                        <div className="product__view-right-product-choose-control-btn" onClick={() => updateQuantity("minus")}>
                                            <i className="fa-solid fa-minus"></i>
                                        </div>
                                        <div className="product__view-right-product-choose-control-display">
                                            {quantity}
                                        </div>
                                        <div className="product__view-right-product-choose-control-btn" onClick={() => updateQuantity("plus")}>
                                            <i className="fa-solid fa-plus"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="product__view-right-product-price">
                                    Giá: <span>{vietnameseCurrency(currentPrice * quantity)}</span>
                                </div>
                                <div className={isAvailable ? "product__view-right-product-status" : "product__view-right-product-status active"}>
                                    <span>{isAvailable ? "Còn hàng" : "Hết hàng"}</span>
                                </div>
                                <div className="product__view-right-product-control">
                                    <button className={isAvailable ? "btn btn--primary" : "btn btn--disabled"} onClick={addToCart}>Thêm vào giỏ hàng</button>
                                    <Link to="/cart" className="btn btn--primary">Đến giỏ hàng</Link>
                                </div>
                                <div className="product__view-right-product-detail">
                                    <h3>Thông tin sản phẩm</h3>
                                    <div className={active ? "product__view-right-product-detail-box active" : "product__view-right-product-detail-box"} ref={content} style={{ maxHeight: `${height}` }}>
                                        {product.description}
                                        <button onClick={onSeeMore} className="btn btn--primary">{active ? "Thu gọn" : "Xem thêm"}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductView