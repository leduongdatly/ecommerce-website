import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from "../../firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewProductRequest, getAllProductRequest, updateProductRequest } from '../../redux/actions/ProductsAction';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {

    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const productRedux = useSelector((state) => state.products.products);
    const colorRedux = useSelector((state) => state.colors.colors);
    const brandRedux = useSelector((state) => state.brands.brands);
    const sizeRedux = useSelector((state) => state.sizes.sizes);

    let [name, setName] = useState("");
    let [slug, setSlug] = useState("");
    let [price, setPrice] = useState(0);
    let [quantity, setQuantity] = useState(0);
    let [sale, setSale] = useState(0);
    let [avatar, setAvatar] = useState("");
    let [detailImg, setDetailImg] = useState("");
    let [img, setImg] = useState([]);
    let [color, setColor] = useState([]);
    let [size, setSize] = useState([]);
    let [brand, setBrand] = useState("");
    let [description, setDescription] = useState("");
    let [id, setId] = useState("");
    let [empty, setEmpty] = useState({ img: "" });

    const setDefault = () => {
        setEmpty({ img: "" });
        setName("");
        setSlug("");
        setPrice(0);
        setQuantity(0);
        setSale(0);
        setAvatar("");
        setDetailImg("");
        setImg([]);
        setColor([]);
        setBrand("");
        setSize([]);
        setDescription("");
    }

    useEffect(() => {
        let productData;
        if (params.slug) {
            productData = productRedux.find((item) => item.slug === params.slug);
        }

        if (productData) {
            setId(productData.id);
            setName(productData.name);
            setSlug(productData.slug);
            setPrice(productData.price);
            setQuantity(productData.quantity);
            setSale(productData.sale);
            setAvatar(productData.avatar);
            setDetailImg(productData.detailImg);
            setImg((prev) => [...prev, ...productData.img]);
            setColor((prev) => [...prev, ...productData.colors]);
            setSize((prev) => [...prev, ...productData.sizes]);
            setBrand(productData.brand);
            setDescription(productData.description);
        } else {
            setDefault();
        }
    }, []);

    const handleAddColor = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var checked = target.checked;

        const newColor = {
            [name]: value
        }

        checked ? setColor((prev) => [...prev, newColor]) : setColor(color.filter(e => e.color !== newColor.color))
    }

    const handleAddSize = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var checked = target.checked;

        const newSize = {
            [name]: value
        }

        checked ? setSize((prev) => [...prev, newSize]) : setSize(size.filter(e => e.size !== newSize.size))
    }

    // const handleAddBrand = (e) => {
    //     var target = e.target;
    //     var name = target.name;
    //     var value = target.value;
    //     var checked = target.checked;

    //     const newBrand = {
    //         [name]: value
    //     }

    //     checked ? setBrand((prev) => [...prev, newBrand]) : setBrand(brand.filter(e => e.brand !== newBrand.brand))
    // }

    const check = () => {
        if (name === "") return false;

        if (slug === "") return false;

        if (avatar === "") return false;

        if (detailImg === "") return false;

        if (img.length <= 0) return false;

        if (color.length <= 0) return false;

        if (brand.length <= 0) return false;

        if (size.length <= 0) return false;

        if (description === "") return false;

        return true;
    }

    const onAvatarChanged = (e) => {
        var value = e.target.files[0];
        const avatarRef = ref(storage, `images/${value + v4()}`);
        uploadBytes(avatarRef, value).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setAvatar(url);
            })
        })
    }

    const handleAddLink = (type, value) => {
        if (type === "avatar") {
            setAvatar(value)
        }

        if (type === "detailImg") {
            setDetailImg(value)
        }

        if (type === "slider") {
            setEmpty((prev) => ({
                ...prev,
                img: value
            }))
        }
    }

    const handleAddSlider = (e) => {
        e.preventDefault();
        if (empty.img === "") {
            alert("Mời nhập ảnh slider")
        } else {
            setImg((prev) => [...prev, empty]);
            setEmpty((prev) => ({
                ...prev,
                img: ""
            }));
        }
    }

    const onDetailImgChanged = (e) => {
        var value = e.target.files[0];
        const detailImgRef = ref(storage, `images/${value + v4()}`);
        uploadBytes(detailImgRef, value).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setDetailImg(url);
            })
        })
    }

    const onImgChanged = (e) => {
        var name = e.target.name;
        var value = e.target.files[0];

        const imgRef = ref(storage, `images/${value + v4()}`);
        uploadBytes(imgRef, value).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const newImg = {
                    [name]: url
                }
                setImg((prev) => [...prev, newImg]);
            })
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (params.slug) {
            if (check()) {
                const newProduct = {
                    id,
                    name,
                    price: Number(price),
                    quantity: Number(quantity),
                    sale: Number(sale),
                    avatar,
                    slug,
                    detailImg,
                    img,
                    colors: color,
                    sizes: size,
                    brand,
                    description
                }
                dispatch(updateProductRequest(newProduct, id));
                dispatch(getAllProductRequest());
                toast.success('Cập nhật thành công!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate(-1)
            } else {
                toast.error('Vui lòng điền đầy đủ thông tin!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        } else {
            if (check()) {
                const newProduct = {
                    name,
                    price: Number(price),
                    quantity: Number(quantity),
                    sale: Number(sale),
                    avatar,
                    slug,
                    detailImg,
                    img,
                    colors: color,
                    sizes: size,
                    brand,
                    description
                }
                dispatch(addNewProductRequest(newProduct));
                dispatch(getAllProductRequest());
                setDefault();
                navigate(-1);
                toast.success('Thêm thành công!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                toast.error('Vui lòng điền đầy đủ thông tin!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
    }

    useEffect(() => {
        setSlug(name.replace(/\s/g, '-'));
    }, [name]);

    return (
        <div className="col l-12">
            <ToastContainer style={{ fontSize: "1.6rem" }} />
            <div className="product__form">
                <h1 className="product__form-title">Thêm sản phẩm</h1>
                <div className="product__form-form">
                    <form className="row" onSubmit={handleSubmit}>
                        <div className="col l-12">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Tên sản phẩm</label>
                                <input type="text" value={name} placeholder="Nhập..." onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="col l-12">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Slug</label>
                                <input type="text" value={slug} name="slug" disabled />
                            </div>
                        </div>
                        <div className="col l-12">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Giá</label>
                                <input type="number" value={price} placeholder="Nhập..." onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className="col l-12">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Số lượng</label>
                                <input type="number" value={quantity} placeholder="Nhập..." onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                        </div>
                        <div className="col l-12">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Sale</label>
                                <input type="number" value={sale} placeholder="Nhập..." onChange={(e) => setSale(e.target.value)} />
                            </div>
                        </div>
                        <div className="col l-12">
                            <div className="product__form-form-input" style={{ position: "relative", top: "50%", transform: "translateY(-50%)", marginBottom: "12px" }}>
                                <label className="product__form-form-input-label" htmlFor="avatar" id="avatarr">Ảnh đại diện</label>
                                <input type="file" id="avatar" onChange={onAvatarChanged} /> hoặc
                                <input type="text" className="span" placeholder="Nhập link" style={{ width: "30%", marginLeft: "6px" }} value={avatar} onChange={(e) => handleAddLink("avatar", e.target.value)} />
                                {avatar && <input className="input" type="text" placeholder="Liên kết ảnh" disabled value={avatar} />}
                            </div>
                        </div>
                        <div className="col l-12">
                            <div className="product__form-form-input" style={{ position: "relative", top: "50%", transform: "translateY(-50%)", marginBottom: "12px" }}>
                                <label className="product__form-form-input-label" htmlFor="detail-img" id="avatarr">Ảnh chi tiết</label>
                                <input type="file" id="detail-img" onChange={onDetailImgChanged} /> hoặc
                                <input type="text" className="span" placeholder="Nhập link" style={{ width: "30%", marginLeft: "6px" }} value={detailImg} onChange={(e) => handleAddLink("detailImg", e.target.value)} />
                                {detailImg && <input className="input" type="text" placeholder="Liên kết ảnh" disabled value={detailImg} />}
                            </div>
                        </div>
                        <div className="col l-12">
                            <div className="product__form-form-input" style={{ position: "relative", top: "50%", transform: "translateY(-50%)", marginBottom: "12px" }}>
                                <label className="product__form-form-input-label" htmlFor="slider-img" id="avatarr">Ảnh slider</label>
                                <input type="file" name="img" id="slider-img" onChange={onImgChanged} /> hoặc
                                <input type="text" className="span" placeholder="Nhập link" style={{ width: "30%", marginLeft: "6px" }} value={empty.img} onChange={(e) => handleAddLink("slider", e.target.value)} />
                                <button className="btn btn--primary" style={{marginLeft: "6px"}} onClick={handleAddSlider}>Thêm</button>
                                {
                                    img.map((item, index) => {
                                        return (
                                            <input key={index} className="input" type="text" placeholder="Liên kết ảnh" disabled value={item.img} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col l-12">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Màu sắc</label>
                                {
                                    colorRedux.map((item, index) => {
                                        return (
                                            <label htmlFor={item.id} key={index} className={`product__form-form-input-box ${color.find(a => a.color === item.color) ? "active" : ""}`} >
                                                {item.color}
                                                <input type="checkbox" name="color" value={item.color} id={item.id} onChange={(e) => handleAddColor(e)} />
                                            </label>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col l-12">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Kích cỡ</label>
                                {
                                    sizeRedux.map((item, index) => {
                                        return (
                                            <label htmlFor={item.id} key={index} className={`product__form-form-input-box ${size.find(a => a.size === item.size) ? "active" : ""}`} >
                                                {item.size}
                                                <input type="checkbox" name="size" value={item.size} id={item.id} onChange={(e) => handleAddSize(e)} />
                                            </label>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col l-12">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Thương hiệu</label>
                                {
                                    brandRedux.map((item, index) => {
                                        return (
                                            <div key={index} className={`product__form-form-input-box ${brand === item.brand ? "active" : ""}`} onClick={() => setBrand(item.brand)} >
                                                {item.brand}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col l-12">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Chi tiết sản phẩm</label>
                                <textarea cols="20" rows="10" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <div className="col l-12">
                            <div className="product__form-form-btn">
                                <button className="btn btn--primary">{params.slug ? "Cập nhật" : "Thêm mới"}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default ProductForm