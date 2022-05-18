import * as types from "../constants/ActionTypes";

const initialState = {
    products: [],
}

const productReducer = (state = initialState, action) => {
    var data = action.payload;
    switch (action.type) {
        case types.GET_ALL_PRODUCT:
            return {
                ...state,
                products: data,
            }
        case types.ADD_NEW_PRODUCT:
            return {
                ...state,
                // products: [...state.products, data]
            }
        case types.UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(item =>
                    item.slug === data.slug ? data : item
                )
            }
        case types.DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(item =>
                    item.id !== data
                )
            }
        default: return state
    }
}

export default productReducer;