import * as types from "../constants/ActionTypes";
import brandFirebase from "../../firebase/Brand";

export const getAllBrand = (brands) => {
    return {
        type: types.GET_ALL_BRAND,
        payload: brands
    }
}

export const getAllBrandRequest = () => {
    return async (dispatch) => {
        let data = await brandFirebase.getAll()
        data = data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }));
        dispatch(getAllBrand(data));
    }
}

export const addBrandd = (brand) => {
    return {
        type: types.ADD_BRAND,
        payload: brand
    }
}

export const addBrandRequest = (brand) => {
    return async (dispatch) => {
        await brandFirebase.addBrand(brand);
        dispatch(addBrandd(brand));
    }
}

export const deleteBrandd = (id) => {
    return {
        type: types.DELETE_BRAND,
        payload: id
    }
}

export const deleteBrandRequest = (id) => {
    return async (dispatch) => {
        await brandFirebase.deleteBrand(id)
        dispatch(deleteBrandd(id));
    }
}

export const updateBrandd = (data) => {
    return {
        type: types.UPDATE_BRAND,
        payload: data
    }
}

export const updateBrandRequest = (id, brand) => {
    const data = {
        id: id,
        brand: brand
    }
    return async (dispatch) => {
        await brandFirebase.updateBrand(id, brand);
        dispatch(updateBrandd(data));
    }
}