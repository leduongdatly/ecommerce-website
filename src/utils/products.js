const getProducts = (products, count) => {
    const max = products.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return products.slice(start, start + count)
}

const getProductBySlug = (products, slug) => {
    return products.find((item) => item.slug === slug);
}

const productData = {
    getProducts,
    getProductBySlug
}

export default productData;