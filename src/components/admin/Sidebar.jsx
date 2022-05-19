import React, { useRef } from "react";
import { useAuth } from "../../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../redux/actions/UserAction";
import { useDispatch } from "react-redux";

const mainSide = [
    {
        display: "Trang chủ",
        path: "/",
        icon: <i className="fa-solid fa-house"></i>
    },
    {
        display: "Màu sắc",
        path: "/color-manage",
        icon: <i className="fa-solid fa-palette"></i>
    },
    {
        display: "Thương hiệu",
        path: "/brand-manage",
        icon: <i className="fa-solid fa-copyright"></i>
    },
    {
        display: "Kích cỡ",
        path: "/size-manage",
        icon: <i className="fa-solid fa-window-maximize"></i>
    },
    {
        display: "Sản phẩm",
        path: "/product-manage",
        icon: <i className="fa-solid fa-warehouse"></i>
    },
    {
        display: "Tài khoản",
        path: "/account-manage",
        icon: <i className="fa-solid fa-user"></i>
    }
]

const Sidebar = () => {

    const dispatch = useDispatch();
    const { currentUser, signout } = useAuth();

    const menuRef = useRef(null);
    const navigate = useNavigate();

    const onShowSidebar = () => {
        menuRef.current.classList.toggle("active");
    }

    const onLogout = async () => {
        try {
            await signout()
            localStorage.removeItem("role");
            dispatch(userLogout());
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="col l-4-2">
            <div className="sidebar__box" ref={menuRef}>
                <div className="sidebar__box-close" onClick={onShowSidebar}>
                    <i className="fas fa-times"></i>
                </div>
                <h3 className="sidebar__box-heading">Chào mừng: <span>{currentUser ? currentUser.email : ""}</span></h3>
                {
                    mainSide.map((item, index) => {
                        return (
                            <div className="sidebar__box-item" key={index} onClick={onShowSidebar}>
                                <Link to={item.path}>
                                    <div className="sidebar__box-item-icon">
                                        {item.icon}
                                    </div>
                                    <span>
                                        {item.display}
                                    </span>
                                </Link>
                            </div>
                        )
                    })
                }
                <div className="sidebar__box-logout">
                    <Link to="/" className="" onClick={onLogout}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        <span>Đăng xuất</span>
                    </Link>
                </div>
            </div>
            <div className="sidebar__box-btn">
                <div onClick={onShowSidebar} className="btn btn--primary">Hiện sidebar</div>
            </div>
        </div>
    )
}

export default Sidebar