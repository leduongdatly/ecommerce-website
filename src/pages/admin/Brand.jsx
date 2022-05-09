import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBrandRequest, deleteBrandRequest, getAllBrandRequest, updateBrandRequest } from "../../redux/actions/BrandsAction";

const Brand = () => {

    const [check, setCheck] = useState(false);
    const [brand, setBrand] = useState("");
    const [type, setType] = useState("");
    const [id, setId] = useState("");

    const dispatch = useDispatch();
    const brandRedux = useSelector((state) => state.brands.brands);

    const handleAddBrand = () => {
        setCheck(true);
        setBrand("");
        setId("");
        setType("add");
    }

    const onCancel = () => {
        setCheck(false);
        setBrand("");
        setId("");
        setType("");
    }

    const onChangeBrand = (data) => setBrand(data);

    const onDeleteBrand = (id) => {
        dispatch(deleteBrandRequest(id));
    }

    const onUpdateBrand = (id, brand) => {
        if(check) {
            setBrand(brand);
            setId(id);
            setType("update");
        } else {
            setCheck(true);
            setBrand(brand);
            setId(id);
            setType("update");
        }
    }

    const onAddBrand = () => {
        if (brand) {
            if (type == "add") {
                dispatch(addBrandRequest(brand));
                dispatch(getAllBrandRequest());
                setBrand("")
                setId("");
                setType("");
                setCheck(false);
            } else {
                dispatch(updateBrandRequest(id, brand));
                setBrand("");
                setId("");
                setType("");
                setCheck(false);
            }
        } else {
            alert("Mời điền")
        }
    }

    return (
        <div className="col l-12 m-12">
            <div className="commom">
                <h3 className="commom__title">Quản lý thương hiệu</h3>
                <div className="commom__btn">
                    <button className="btn btn--primary" onClick={handleAddBrand}>Thêm mới</button>
                </div>
                <div className="commom__table">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>id</th>
                                <th>Thương hiệu</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                check ?
                                    <tr>
                                        <td><input type="text" placeholder="Nhập..." value={brand ? brand : ""} onChange={(e) => onChangeBrand(e.target.value)} /></td>
                                        <td>
                                            <button className="btn btn--primary" onClick={onCancel}>Hủy</button>
                                            <button className="btn btn--primary" onClick={onAddBrand} >{type == "update" ? "Cập nhật" : "Thêm"}</button>
                                        </td>
                                        <td></td>
                                        <td>{type == "update" ? "Cập nhật" : "Thêm"}</td>
                                    </tr> :
                                    null
                            }
                            {
                                brandRedux.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td><div>{item.brand}</div></td>
                                            <td>
                                                <button className="btn btn--primary" onClick={() => onDeleteBrand(item.id)}>Xóa</button>
                                                <button className="btn btn--primary" onClick={() => onUpdateBrand(item.id, item.brand)}>Cập nhật</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Brand