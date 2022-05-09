import * as types from "../constants/ActionTypes";

const initialState = {
    brands: [],
}

const brandsReducer = (state = initialState, action) => {
    var data = action.payload;
    switch (action.type) {
        case types.GET_ALL_BRAND:
            data = action.payload;
            return {
                ...state,
                brands: data,
            }
        case types.ADD_BRAND:
            return {
                ...state,
            }
        case types.DELETE_BRAND:
            return {
                ...state,
                brands: state.brands.filter((item) =>
                    item.id !== data
                )
            }
        case types.UPDATE_BRAND:
            return {
                ...state,
                brands: state.brands.map((item) =>
                    item.id === data.id ? { ...item, brand: data.brand } : item
                )
            }
        default: return state
    }
}

export default brandsReducer;