import React from "react";

const Banner = ({ img }) => {
    return (
        <section className="banner">
            <div className="grid wide">
                <div className="row">
                    <div className="col l-12 m-12 c-12">
                        <img src={img} alt="banner" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner