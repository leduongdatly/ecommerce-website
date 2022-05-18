import * as types from "../constants/ActionTypes";
import productsFirebase from "../../firebase/Products";

export const getAllProduct = (products) => {
    return {
        type: types.GET_ALL_PRODUCT,
        payload: products
    }
}

export const getAllProductRequest = () => {
    return async (dispatch) => {
        let data = await productsFirebase.getAll()
        data = data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }));
        dispatch(getAllProduct(data));
    }
}

export const addNewProduct = (product) => {
    return {
        type: types.ADD_NEW_PRODUCT,
        payload: product
    }
}

export const addNewProductRequest = (data) => {
    return async (dispatch) => {
        await productsFirebase.addNewProduct(data)
        dispatch(addNewProduct(data));
    }
}

export const updateProducts = (product) => {
    return {
        type: types.UPDATE_PRODUCT,
        payload: product
    }
}

export const updateProductRequest = (data, id) => {
    return async (dispatch) => {
        await productsFirebase.updateProduct(data, id);
        dispatch(updateProducts(data));
    }
}

export const deleteProducts = (id) => {
    return {
        type: types.DELETE_PRODUCT,
        payload: id
    }
}

export const deleteProductRequest = (id) => {
    return async (dispatch) => {
        await productsFirebase.deleteProduct(id);
        dispatch(deleteProducts(id));
    }
}