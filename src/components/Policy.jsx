import React from "react";

const Policy = () => {
    return (
        <section className="policy">
            <div className="grid wide">
                <div className="row">
                    <div className="col l-3 m-6 c-12">
                        <div className="policy__item">
                            <div className="policy__item-icon">
                                <i className="fa-solid fa-bag-shopping"></i>
                            </div>
                            <div className="policy__item-info">
                                <h3 className="policy__item-info-name">Miễn phí giao hàng</h3>
                                <p className="policy__item-info-desc">{`Miễn phí ship với đơn hàng > 239k`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col l-3 m-6 c-12">
                        <div className="policy__item">
                            <div className="policy__item-icon">
                                <i className="fa-solid fa-credit-card"></i>
                            </div>
                            <div className="policy__item-info">
                                <h3 className="policy__item-info-name">Thanh toán COD</h3>
                                <p className="policy__item-info-desc">Thanh toán khi nhận hàng (COD)</p>
                            </div>
                        </div>
                    </div>
                    <div className="col l-3 m-6 c-12">
                        <div className="policy__item">
                            <div className="policy__item-icon">
                                <i className="fa-solid fa-gem"></i>
                            </div>
                            <div className="policy__item-info">
                                <h3 className="policy__item-info-name">Khách hàng VIP</h3>
                                <p className="policy__item-info-desc">Ưu đãi dành cho khách hàng VIP</p>
                            </div>
                        </div>
                    </div>
                    <div className="col l-3 m-6 c-12">
                        <div className="policy__item">
                            <div className="policy__item-icon">
                                <i className="fa-solid fa-hand-holding-heart"></i>
                            </div>
                            <div className="policy__item-info">
                                <h3 className="policy__item-info-name">Hỗ trợ bảo hành</h3>
                                <p className="policy__item-info-desc">Hỗ trợ bảo hành lên đến 12 tháng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Policy