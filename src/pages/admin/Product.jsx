import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductTable from "../../components/admin/ProductTable";

const Product = () => {

    const products = useSelector((state) => state.products.products);

    return (
        <div className="col l-12 m-12">
            <div className="product commom">
                <h3 className="commom__title">Quản lý sản phẩm</h3>
                <div className="commom__btn">
                    <Link to="/product-manage/add" className="btn btn--primary">Thêm mới</Link>
                </div>
                <div className="product__table">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Avatar</th>
                                <th>Màu sắc</th>
                                <th>Kích cỡ</th>
                                <th>Thương hiệu</th>
                                <th>Giá</th>
                                <th>Sale</th>
                                <th>Số lượng</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ProductTable products={products} />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Product