import * as types from "../constants/ActionTypes";
import sizeFirebase from "../../firebase/Size";

export const getAllSize = (sizes) => {
    return {
        type: types.GET_ALL_SIZE,
        payload: sizes
    }
}

export const getAllSizeRequest = () => {
    return async (dispatch) => {
        let data = await sizeFirebase.getAll()
        data = data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }));
        dispatch(getAllSize(data));
    }
}

export const addSizee = (size) => {
    return {
        type: types.ADD_SIZE,
        payload: size
    }
}

export const addSizeeRequest = (size) => {
    return async (dispatch) => {
        await sizeFirebase.addSize(size);
        dispatch(addSizee(size));
    }
}

export const deleteSizee = (id) => {
    return {
        type: types.DELETE_SIZE,
        payload: id
    }
}

export const deleteSizeeRequest = (id) => {
    return async (dispatch) => {
        await sizeFirebase.deleteSize(id)
        dispatch(deleteSizee(id));
    }
}

export const updateSizee = (data) => {
    return {
        type: types.UPDATE_SIZE,
        payload: data
    }
}

export const updateSizeeRequest = (id, size) => {
    const data = {
        id: id,
        size: size
    }
    return async (dispatch) => {
        await sizeFirebase.updateSize(id, size);
        dispatch(updateSizee(data));
    }
}