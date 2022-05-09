import React from "react";

const ProductTable = ({ products }) => {

    console.log(products)

    const showProduct = () => {
        let result = [];
        if (products) {
            result = products.map((item, index) => {
                return (
                    < tr >
                        <td>{index + 1}</td>
                        <td>
                            <div className="product__table-img">
                                <img src={item.avatar} alt={item.name} />
                            </div>
                        </td>
                        <td>
                            {
                                item.colors.map((a, index) => {
                                    return (
                                        <p key={index}>{a.color}, </p>
                                    )
                                })
                            }
                        </td>
                        <td>
                            {
                                item.sizes.map((a, index) => {
                                    return (
                                        <p key={index}>{a.size}, </p>
                                    )
                                })
                            }
                        </td>
                        <td>
                            <p className="product__table-brand">{item.brand}</p>
                        </td>
                        <td>
                            <p className="product__table-price">{item.price}</p>
                        </td>
                        <td>
                            <p className="product__table-sale">{item.sale}</p>
                        </td>
                        <td>
                            <p className="product__table-quantity">{item.quantity}</p>
                        </td>
                        <td>
                            <button className="btn btn--primary">Cập nhật</button>
                        </td>
                    </tr >
                )
            })
        }
        return result;
    }

    return showProduct();
}

export default ProductTable