import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addColorRequest, deleteColorRequest, getAllColorRequest, updateColorRequest } from "../../redux/actions/ColorsAction";

const Color = () => {

    const [check, setCheck] = useState(false);
    const [color, setColor] = useState("");
    const [type, setType] = useState("");
    const [id, setId] = useState("");

    const dispatch = useDispatch();
    const colorRedux = useSelector((state) => state.colors.colors);

    const handleAddColor = () => {
        setCheck(true);
        setColor("");
        setId("");
        setType("add");
    }

    const onCancel = () => {
        setCheck(false);
        setColor("");
        setId("");
        setType("");
    }

    const onChangeColor = (data) => setColor(data);

    const onDeleteColor = (id) => {
        dispatch(deleteColorRequest(id));
    }

    const onUpdateColor = (id, color) => {
        if(check) {
            // setCheck(true);
            setColor(color);
            setId(id);
            setType("update");
        } else {
            setCheck(true);
            setColor(color);
            setId(id);
            setType("update");
        }
    }

    const onAddColor = () => {
        if (color) {
            if (type == "add") {
                dispatch(addColorRequest(color));
                dispatch(getAllColorRequest());
                setColor("")
                setId("");
                setType("");
                setCheck(false);
            } else {
                dispatch(updateColorRequest(id, color));
                setColor("");
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
                <h3 className="commom__title">Quản lý màu sắc</h3>
                <div className="commom__btn">
                    <button className="btn btn--primary" onClick={handleAddColor}>Thêm mới</button>
                </div>
                <div className="commom__table">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>id</th>
                                <th>Màu</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                check ?
                                    <tr>
                                        <td><input type="text" placeholder="Nhập..." value={color ? color : ""} onChange={(e) => onChangeColor(e.target.value)} /></td>
                                        <td>
                                            <button className="btn btn--primary" onClick={onCancel}>Hủy</button>
                                            <button className="btn btn--primary" onClick={onAddColor} >{type == "update" ? "Cập nhật" : "Thêm"}</button>
                                        </td>
                                        <td></td>
                                        <td>{type == "update" ? "Cập nhật" : "Thêm"}</td>
                                    </tr> :
                                    null
                            }
                            {
                                colorRedux.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td><div>{item.color}</div></td>
                                            <td>
                                                <button className="btn btn--primary" onClick={() => onDeleteColor(item.id)}>Xóa</button>
                                                <button className="btn btn--primary" onClick={() => onUpdateColor(item.id, item.color)}>Cập nhật</button>
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

export default Color