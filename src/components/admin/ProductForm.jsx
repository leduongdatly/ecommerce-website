import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from "../../firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewProductRequest } from '../../redux/actions/ProductsAction';

const ProductForm = () => {

    const dispatch = useDispatch();
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

    const setDefault = () => {
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
                console.log(url)
                setImg((prev) => [...prev, newImg]);
            })
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
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
            setDefault();
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

    useEffect(() => {
        setDefault();
    }, []);

    useEffect(() => {
        setSlug(name.replace(/\s/g, '-'));
    }, [name]);

    return (
        <div className="col l-12">
            <ToastContainer style={{ fontSize: "1.6rem" }} />
            <div className="row">
                {
                    avatar &&
                    <div className="col l-4">
                        <h3 className="title">Ảnh đại diện</h3>
                        <img src={avatar} alt="" className="img" />
                    </div>
                }
                {
                    detailImg &&
                    <div className="col l-4">
                        <h3 className="title">Ảnh chi tiết</h3>
                        <img src={detailImg} alt="" className="img" />
                    </div>
                }
                {
                    img.length > 0 &&
                    <div className="col l-4">
                        <h3 className="title">Ảnh slider</h3>
                        {
                            img.length > 0 && img.map((item) => {
                                return (
                                    <>
                                        <img key={item.img} src={item.img} alt={item.img} className="img" />
                                    </>
                                )
                            })
                        }
                    </div>
                }
            </div>
            <div className="product__form">
                <h1 className="product__form-title">Thêm sản phẩm</h1>
                <div className="product__form-form">
                    <form className="row" onSubmit={handleSubmit}>
                        <div className="col l-3">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Tên sản phẩm</label>
                                <input type="text" value={name} placeholder="Nhập..." onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="col l-3">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Slug</label>
                                <input type="text" value={slug} name="slug" disabled />
                            </div>
                        </div>
                        <div className="col l-3">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Giá</label>
                                <input type="number" value={price} placeholder="Nhập..." onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className="col l-3">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Số lượng</label>
                                <input type="number" value={quantity} placeholder="Nhập..." onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                        </div>
                        <div className="col l-3">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Sale</label>
                                <input type="number" value={sale} placeholder="Nhập..." onChange={(e) => setSale(e.target.value)} />
                            </div>
                        </div>
                        <div className="col l-3">
                            <div className="product__form-form-input" style={{ position: "relative", top: "50%", transform: "translateY(-50%)" }}>
                                <label className="product__form-form-input-label" htmlFor="avatar" id="avatarr">Ảnh đại diện</label>
                                <input type="file" id="avatar" onChange={onAvatarChanged} />
                            </div>
                        </div>
                        <div className="col l-3">
                            <div className="product__form-form-input" style={{ position: "relative", top: "50%", transform: "translateY(-50%)" }}>
                                <label className="product__form-form-input-label" htmlFor="detail-img" id="avatarr">Ảnh chi tiết</label>
                                <input type="file" id="detail-img" onChange={onDetailImgChanged} />
                            </div>
                        </div>
                        <div className="col l-3">
                            <div className="product__form-form-input" style={{ position: "relative", top: "50%", transform: "translateY(-50%)" }}>
                                <label className="product__form-form-input-label" htmlFor="slider-img" id="avatarr">Ảnh slider</label>
                                <input type="file" name="img" id="slider-img" onChange={onImgChanged} />
                            </div>
                        </div>
                        <div className="col l-3">
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
                        <div className="col l-3">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Kích cỡ</label>
                                {
                                    sizeRedux.map((item, index) => {
                                        return (
                                            <label htmlFor={item.id} key={index} className={`product__form-form-input-box ${size.find(a => a.size === item.size) ? "active" : ""}`}>
                                                {item.size}
                                                <input type="checkbox" name="size" value={item.size} id={item.id} onChange={(e) => handleAddSize(e)} />
                                            </label>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col l-3">
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
                        <div className="col l-3">
                            <div className="product__form-form-input">
                                <label className="product__form-form-input-label">Chi tiết sản phẩm</label>
                                <textarea cols="20" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <div className="col l-3">
                            <div className="product__form-form-btn">
                                <button className="btn btn--primary">Thêm mới</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default ProductForm