import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="grid wide footer__content">
                <div className="row">
                    <div className="col l-3 m-4 c-6">
                        <h3 className="footer__heading">
                            Chăm sóc khách hàng
                        </h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <Link to="#" className="footer__item-link">Trung tâm trợ giúp</Link>
                            </li>
                            <li className="footer__item">
                                <Link to="#" className="footer__item-link">duongnd1402@gmail.com</Link>
                            </li>
                            <li className="footer__item">
                                <Link to="#" className="footer__item-link">Hướng dẫn mua hàng</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col l-3 m-4 c-6">
                        <h3 className="footer__heading">
                            Về chúng tôi
                        </h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <Link to="#" className="footer__item-link">Giới thiệu</Link>
                            </li>
                            <li className="footer__item">
                                <Link to="#" className="footer__item-link">Tuyển dụng</Link>
                            </li>
                            <li className="footer__item">
                                <Link to="#" className="footer__item-link">Điều khoản</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col l-3 m-4 c-6">
                        <h3 className="footer__heading">
                            Danh mục
                        </h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <Link to="#" className="footer__item-link">Điện thoại</Link>
                            </li>
                            <li className="footer__item">
                                <Link to="#" className="footer__item-link">Lap top</Link>
                            </li>
                            <li className="footer__item">
                                <Link to="#" className="footer__item-link">Phụ kiện</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col l-3 m-4 c-6">
                        <h3 className="footer__heading">
                            Theo giỏi
                        </h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <Link to="#" className="footer__item-link">
                                    <i className="fa-brands fa-facebook-square"></i> Facebook
                                </Link>
                            </li>
                            <li className="footer__item">
                                <Link to="#" className="footer__item-link">
                                    <i className="fa-brands fa-instagram-square"></i> Instagram
                                </Link>
                            </li>
                            <li className="footer__item">
                                <Link to="#" className="footer__item-link">
                                    <i className="fa-brands fa-twitter-square"></i> Twitter
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer