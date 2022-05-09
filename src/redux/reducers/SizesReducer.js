import * as types from "../constants/ActionTypes";

const initialState = {
    sizes: [],
}

const sizesReducer = (state = initialState, action) => {
    var data = action.payload;
    switch (action.type) {
        case types.GET_ALL_SIZE:
            data = action.payload;
            return {
                ...state,
                sizes: data,
            }
        case types.ADD_SIZE:
            return {
                ...state,
            }
        case types.DELETE_SIZE:
            return {
                ...state,
                sizes: state.sizes.filter((item) =>
                    item.id !== data
                )
            }
        case types.UPDATE_SIZE:
            return {
                ...state,
                sizes: state.sizes.map((item) =>
                    item.id === data.id ? { ...item, size: data.size } : item
                )
            }
        default: return state
    }
}

export default sizesReducer;