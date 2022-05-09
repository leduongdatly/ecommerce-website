import React, { useRef, useState } from "react";

const PageBar = ({ currentPage, productsPerPage, totalProducts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination">
            {
                pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href={`#page-${number}`} className={currentPage === number ? "page-link active" : "page-link"}>
                            {number}
                        </a>
                    </li>
                ))
            }
        </ul>
    )
}

export default PageBar