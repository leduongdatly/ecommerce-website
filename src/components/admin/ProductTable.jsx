import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProductRequest } from "../../redux/actions/ProductsAction";
import vietnameseCurrency from "../../utils/currency";

const ProductTable = ({ products }) => {

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteProductRequest(id));
    }

    const showProduct = () => {
        let result = [];
        if (products) {
            result = products.map((item, index) => {
                return (
                    < tr key={index} >
                        <td>{index + 1}</td>
                        <td>
                            <div className="product__table-img">
                                <img src={item.avatar} alt={item.name} />
                            </div>
                        </td>
                        <td>
                            <p className="product__table-brand">{item.brand}</p>
                        </td>
                        <td>
                            {
                                item.sizes.map((a, index) => {
                                    return (
                                        <p key={index}>{a.size} </p>
                                    )
                                })
                            }
                        </td>
                        <td>
                            {
                                item.colors.map((a, index) => {
                                    return (
                                        <p key={index}>{a.color} </p>
                                    )
                                })
                            }
                        </td>
                        <td>
                            <p className="product__table-price">{vietnameseCurrency(item.price)}</p>
                        </td>
                        <td>
                            <p className="product__table-sale">{item.sale}%</p>
                        </td>
                        <td>
                            <p className="product__table-quantity">{item.quantity}</p>
                        </td>
                        <td>
                            <Link to={`/product-manage/edit/${item.slug}`} className="btn btn--primary">Cập nhật</Link>
                            <button className="btn btn--primary" onClick={() => handleDelete(item.id)}>Xóa</button>
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