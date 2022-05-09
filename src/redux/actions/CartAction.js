import * as types from "../constants/ActionTypes";
import cartFirebase from "../../firebase/Cart";

export const getAllCart = (data) => {
    return {
        type: types.GET_ALL_CART,
        payload: data
    }
}

export const getAllCartRequest = () => {
    return async (dispatch) => {
        let data = await cartFirebase.getAll()
        data = data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }));
        dispatch(getAllCart(data));
    }
}

export const addToUserCart = (item) => {
    return {
        type: types.ADD_TO_CART,
        payload: item
    }
}

export const addToUserCartRequest = (item) => {
    return async (dispatch) => {
        await cartFirebase.addToCart(item);
        dispatch(addToUserCart(item));
    }
}

export const updateUserCartQuantity = (item) => {
    return {
        type: types.UPDATE_QUANTITY,
        payload: item
    }
}

export const updateUserCartQuantityRequest = (quantity, price, id, item) => {
    return async (dispatch) => {
        await cartFirebase.updateCartQuantity(quantity, price, id);
        dispatch(updateUserCartQuantity(item));
    }
}

export const deleteFromCart = (id) => {
    return {
        type: types.DELETE_FROM_CART,
        payload: id
    }
}

export const deleteFromCartRequest = (id) => {
    return async (dispatch) => {
        await cartFirebase.deleteFromCart(id);
        dispatch(deleteFromCart(id));
    }
}