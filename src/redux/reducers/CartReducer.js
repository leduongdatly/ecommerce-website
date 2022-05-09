import * as types from "../constants/ActionTypes";

const initialState = {
    carts: [],
}

const cartsReducer = (state = initialState, action) => {
    var data = action.payload;
    var newData = null;
    switch (action.type) {
        case types.GET_ALL_CART:
            return {
                ...state,
                carts: data,
            }
        case types.ADD_TO_CART:
            data = [data];
            var aa = state.carts.concat(data);
            return {
                ...state,
                carts: state.carts
            }
        case types.UPDATE_QUANTITY:
            const a = state.carts.map((item) =>
                item.slug === data.slug && item.color === data.color && item.size === data.size ? { ...item, quantity: data.quantity, price: data.price } : item
            )
            return {
                ...state,
                carts: a
            }
        case types.DELETE_FROM_CART:
            newData = state.carts.filter((item) =>
                item.id !== data
            )
            return {
                ...state,
                carts: newData
            }
        default: return state
    }
}

export default cartsReducer;