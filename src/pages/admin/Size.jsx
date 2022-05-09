import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSizeeRequest, deleteSizeeRequest, getAllSizeRequest, updateSizeeRequest } from "../../redux/actions/SizesAction";

const Size = () => {

    const [check, setCheck] = useState(false);
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [id, setId] = useState("");

    const dispatch = useDispatch();
    const sizeRedux = useSelector((state) => state.sizes.sizes);

    const handleAddSize = () => {
        setCheck(true);
        setSize("");
        setId("");
        setType("add");
    }

    const onCancel = () => {
        setCheck(false);
        setSize("");
        setId("");
        setType("");
    }

    const onChangeSize = (data) => setSize(data);

    const onDeleteSize = (id) => {
        dispatch(deleteSizeeRequest(id));
    }

    const onUpdateSize = (id, size) => {
        if(check) {
            setSize(size);
            setId(id);
            setType("update");
        } else {
            setCheck(true);
            setSize(size);
            setId(id);
            setType("update");
        }
    }

    const onAddSize = () => {
        if (size) {
            if (type == "add") {
                dispatch(addSizeeRequest(size));
                dispatch(getAllSizeRequest());
                setSize("")
                setId("");
                setType("");
                setCheck(false);
            } else {
                dispatch(updateSizeeRequest(id, size));
                setSize("");
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
                <h3 className="commom__title">Quản lý kích cỡ</h3>
                <div className="commom__btn">
                    <button className="btn btn--primary" onClick={handleAddSize}>Thêm mới</button>
                </div>
                <div className="commom__table">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>id</th>
                                <th>Kích cỡ</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                check ?
                                    <tr>
                                        <td><input type="text" placeholder="Nhập..." value={size ? size : ""} onChange={(e) => onChangeSize(e.target.value)} /></td>
                                        <td>
                                            <button className="btn btn--primary" onClick={onCancel}>Hủy</button>
                                            <button className="btn btn--primary" onClick={onAddSize} >{type == "update" ? "Cập nhật" : "Thêm"}</button>
                                        </td>
                                        <td></td>
                                        <td>{type == "update" ? "Cập nhật" : "Thêm"}</td>
                                    </tr> :
                                    null
                            }
                            {
                                sizeRedux.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td><div>{item.size}</div></td>
                                            <td>
                                                <button className="btn btn--primary" onClick={() => onDeleteSize(item.id)}>Xóa</button>
                                                <button className="btn btn--primary" onClick={() => onUpdateSize(item.id, item.size)}>Cập nhật</button>
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

export default Size