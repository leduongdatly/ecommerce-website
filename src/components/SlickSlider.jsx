import React, { useState } from "react";
import Slider from "react-slick";

import sliderData from "../assets/fake-data/slider";

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex" }}
            onClick={onClick}
        >
            <i className="fa-solid fa-circle-right next-btn"></i>
        </div>
    );
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex" }}
            onClick={onClick}
        >
            <i className="fa-solid fa-circle-left prev-btn"></i>
        </div>
    );
}

const SlickSlider = ({ autoPlay, speed, autoPlayTime, data }) => {

    const settings = {
        infinite: true,
        speed: speed,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: autoPlay,
        autoplaySpeed: autoPlayTime,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }

    return (
        <section className="slider">
            <div className="grid wide">
                <Slider {...settings}>
                    {
                        data ?
                            data.map((item, index) => {
                                return (
                                    <div key={index} className="slider__wrap-img">
                                        <img src={item.img} alt={`image-${index}`} className="slider__wrap-img-image" />
                                    </div>
                                )
                            }) :
                            sliderData.map((item, index) => {
                                return (
                                    <div key={index} className="slider__wrap-img">
                                        <img src={item.img} alt={`image-${index}`} className="slider__wrap-img-image" />
                                    </div>
                                )
                            })
                    }
                </Slider>
            </div>
        </section >
    )
}

export default SlickSlider