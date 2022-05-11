import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/images/Logo-2.png'
import { useAuth } from "../context/UserAuthContext";

const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
    {
        display: "Sản phẩm",
        path: "/catalog"
    },
    {
        display: "Phụ kiện",
        path: "/accessories"
    },
    {
        display: "Liên hệ",
        path: "/contact"
    }
]

const Header = () => {

    const { signout, currentUser } = useAuth();

    const { pathname } = useLocation();
    const activeNav = mainNav.findIndex(e => e.path === pathname);

    const [check, setCheck] = useState(false);
    const [hd, setHd] = useState(false);

    const menuLeft = useRef(null);

    const menuToggle = () => menuLeft.current.classList.toggle('active');

    const userToggle = () => {
        setCheck(!check)
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setHd(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80);
        })
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    const onSignOut = async () => {
        try {
            await signout();
            localStorage.removeItem("role");
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className={hd ? "header shrink" : "header"}>
            <div className="grid wide">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item" onClick={userToggle}>
                            <i className="fa-solid fa-user"></i>
                            <ul className={check ? "header__menu__right__item-list active" : "header__menu__right__item-list"}>
                                <div className="header__menu__right__item-list-close" onClick={userToggle}>
                                    <i className="fa-solid fa-angle-right"></i>
                                </div>
                                {
                                    currentUser ?
                                        <>
                                            <li className="header__menu__right__item-list-item">
                                                <Link to="#" className="header__menu__right__item-list-link">Tài khoản của tôi</Link>
                                            </li>
                                            <li className="header__menu__right__item-list-item">
                                                <Link to="#" className="header__menu__right__item-list-link" onClick={onSignOut}>Đăng xuất</Link>
                                            </li>
                                        </> :
                                        <>
                                            <li className="header__menu__right__item-list-item">
                                                <Link to="register" className="header__menu__right__item-list-link">Đăng ký</Link>
                                            </li>
                                            <li className="header__menu__right__item-list-item">
                                                <Link to="login" className="header__menu__right__item-list-link">Đăng nhập</Link>
                                            </li>
                                        </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header