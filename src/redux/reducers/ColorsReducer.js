import * as types from "../constants/ActionTypes";

const initialState = {
    colors: [],
}

const colorsReducer = (state = initialState, action) => {
    var data = action.payload;
    switch (action.type) {
        case types.GET_ALL_COLOR:
            data = action.payload;
            return {
                ...state,
                colors: data,
            }
        case types.ADD_COLOR:
            return {
                ...state,
            }
        case types.DELETE_COLOR:
            return {
                ...state,
                colors: state.colors.filter((item) => 
                    item.id !== data
                )
            }
        case types.UPDATE_COLOR:
            return {
                ...state,
                colors: state.colors.map((item) => 
                    item.id === data.id ? {...item, color: data.color} : item
                )
            }
        default: return state
    }
}

export default colorsReducer;