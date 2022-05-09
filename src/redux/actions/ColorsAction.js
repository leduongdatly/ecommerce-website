import * as types from "../constants/ActionTypes";
import colorsFirebase from "../../firebase/Colors";

export const getAllColor = (colors) => {
    return {
        type: types.GET_ALL_COLOR,
        payload: colors
    }
}

export const getAllColorRequest = () => {
    return async (dispatch) => {
        let data = await colorsFirebase.getAll()
        data = data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }));
        dispatch(getAllColor(data));
    }
}

export const addColorr = (color) => {
    return {
        type: types.ADD_COLOR,
        payload: color
    }
}

export const addColorRequest = (color) => {
    return async (dispatch) => {
        await colorsFirebase.addColor(color)
        dispatch(addColorr(color));
    }
}

export const deleteColorr = (id) => {
    return {
        type: types.DELETE_COLOR,
        payload: id
    }
}

export const deleteColorRequest = (id) => {
    return async (dispatch) => {
        await colorsFirebase.deleteColor(id)
        dispatch(deleteColorr(id));
    }
}

export const updateColorr = (data) => {
    return {
        type: types.UPDATE_COLOR,
        payload: data
    }
}

export const updateColorRequest = (id, color) => {
    const data = {
        id: id,
        color: color
    }
    return async (dispatch) => {
        await colorsFirebase.updateColor(id, color)
        dispatch(updateColorr(data));
    }
}