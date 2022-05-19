import * as types from "../constants/ActionTypes";

const initialState = {
    users: [],
    role: JSON.parse(localStorage.getItem("role")) || null
}

const usersReducer = (state = initialState, action) => {
    var data = action.payload;
    switch (action.type) {
        case types.GET_ALL_USER:
            data = action.payload;
            return {
                ...state,
                users: data,
            }
        case types.GET_USER_BY_ID:
            localStorage.setItem("role", JSON.stringify(data.role));
            return {
                ...state,
                role: data.role
            }
        case types.ADD_USER:
            data = [data];
            return {
                ...state,
                users: state.users.concat(data)
            }
        case types.LOGOUT_USER:
            return {
                ...state,
                role: JSON.parse(localStorage.getItem("role"))
            }
        case types.UPDATE_ROLE:
            const users = state.users.filter((item) => item.id !== data.id);
            return {
                ...state,
                users: state.users.map((item) =>
                    item.id === data.id ? data : item
                )
            }
        default: return state
    }
}

export default usersReducer;