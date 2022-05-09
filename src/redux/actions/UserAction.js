import * as types from "../constants/ActionTypes";
import userFirebase from "../../firebase/User";

export const getAllUser = (users) => {
    return {
        type: types.GET_ALL_USER,
        payload: users
    }
}

export const getAllUserRequest = () => {
    return async (dispatch) => {
        let data = await userFirebase.getAll()
        data = data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }));
        dispatch(getAllUser(data));
    }
}

export const addUser = (data) => {
    return {
        type: types.ADD_USER,
        payload: data
    }
}

export const addUserRequest = (id, data) => {
    return async (dispatch) => {
        await userFirebase.addUser(id, data);
        dispatch(addUser(data));
    }
}

export const getUserById = (data) => {
    return {
        type: types.GET_USER_BY_ID,
        payload: data
    }
}

export const getUserByIdRequest = (id) => {
    return async (dispatch) => {
        try {
            await userFirebase.getUserById(id)
            .then((result) => {
                dispatch(getUserById(result.data()));
            })
            .catch((err) => {
                console.log(err)
            })
        } catch(err) {
            console.log(err);
        }
    }
}

export const userLogout = () => {
    return {
        type: types.LOGOUT_USER,
    }
}