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
        try {
            await productsFirebase.addNewProduct(data)
                .then((result) => {
                    console.log(result)
                    dispatch(addNewProduct(data));
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch (err) {
            console.log(err)
        }
    }
}