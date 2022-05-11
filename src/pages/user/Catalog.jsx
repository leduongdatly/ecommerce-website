import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Checkbox from "../../components/Checkbox";
import Helmet from "../../components/Helmet";
import PageBar from "../../components/PageBar";
import Pagination from "../../components/Pagination";

const Catalog = () => {

    const brand = useSelector((state) => state.brands.brands);
    const color = useSelector((state) => state.colors.colors);
    const size = useSelector((state) => state.sizes.sizes);
    const productList = useSelector((state) => state.products.products);

    const initFilter = {
        brand: [],
        color: [],
        size: []
    }

    const [products, setProducts] = useState(productList);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);

    const [filter, setFilter] = useState(initFilter);

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case "BRAND":
                    setFilter({ ...filter, brand: [...filter.brand, item.brand] })
                    break
                case "COLOR":
                    setFilter({ ...filter, color: [...filter.color, item.color] })
                    break
                case "SIZE":
                    setFilter({ ...filter, size: [...filter.size, item.size] })
                    break
                default:
            }
        } else {
            switch (type) {
                case "BRAND":
                    const newBrand = filter.brand.filter(e => e !== item.brand)
                    setFilter({ ...filter, brand: newBrand })
                    break
                case "COLOR":
                    const newColor = filter.color.filter(e => e !== item.color)
                    setFilter({ ...filter, color: newColor })
                    break
                case "SIZE":
                    const newSize = filter.size.filter(e => e !== item.size)
                    setFilter({ ...filter, size: newSize })
                    break
                default:
            }
        }
    };

    const clearFilter = () => setFilter(initFilter);

    // get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const updateProducts = useCallback(
        () => {
            let temp = productList

            if (filter.brand.length > 0) {
                temp = temp.filter(e => filter.brand.includes(e.brand))
            }

            if (filter.color.length > 0) {
                temp = temp.filter(e => {
                    const check = e.colors.find(color => filter.color.includes(color.color))
                    return check !== undefined
                })
            }

            if (filter.size.length > 0) {
                temp = temp.filter(e => {
                    const check = e.sizes.find(size => filter.size.includes(size.size))
                    return check !== undefined
                })
            }

            setProducts(temp)
        },
        [filter, productList],
    );

    useEffect(() => {
        updateProducts()
    }, [updateProducts]);

    const filterRef = useRef(null);

    const showHideFilter = () => filterRef.current.classList.toggle("active");

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-2 m-12 c-12">
                            <div className="catalog__filter" ref={filterRef}>
                                <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                                    <i className="fa-solid fa-arrow-left"></i>
                                </div>
                                <div className="catalog__filter__widget">
                                    <div className="catalog__filter__widget__title">
                                        danh mục sản phẩm
                                    </div>
                                    <div className="catalog__filter__widget__content">
                                        {
                                            brand.map((item, index) => (
                                                <div key={index} className="catalog__filter__widget__content__item">
                                                    <Checkbox
                                                        label={item.brand}
                                                        onChange={(input) => filterSelect("BRAND", input.checked, item)}
                                                        checked={filter.brand.includes(item.brand)}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="catalog__filter__widget">
                                    <div className="catalog__filter__widget__title">
                                        màu sắc
                                    </div>
                                    <div className="catalog__filter__widget__content">
                                        {
                                            color.map((item, index) => (
                                                <div key={index} className="catalog__filter__widget__content__item">
                                                    <Checkbox
                                                        label={item.color}
                                                        onChange={(input) => filterSelect("COLOR", input.checked, item)}
                                                        checked={filter.color.includes(item.color)}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="catalog__filter__widget">
                                    <div className="catalog__filter__widget__title">
                                        kích cỡ
                                    </div>
                                    <div className="catalog__filter__widget__content">
                                        {
                                            size.map((item, index) => (
                                                <div key={index} className="catalog__filter__widget__content__item">
                                                    <Checkbox
                                                        label={item.size}
                                                        onChange={(input) => filterSelect("SIZE", input.checked, item)}
                                                        checked={filter.size.includes(item.size)}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="catalog__filter__widget">
                                    <div className="catalog__filter__widget__content btn btn--primary">
                                        <div onClick={clearFilter}>xóa bộ lọc</div>
                                    </div>
                                </div>
                            </div>
                            <div className="catalog__filter__toggle btn btn--primary btn--size-s">
                                <div onClick={() => showHideFilter()}>bộ lọc</div>
                            </div>
                        </div>
                        <div className="col l-10 m-12 c-12">
                            <div className="catalog__content">
                                <Pagination products={currentProducts} />
                                <PageBar currentPage={currentPage} productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default Catalog