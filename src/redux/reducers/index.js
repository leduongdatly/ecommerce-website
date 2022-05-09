import { combineReducers } from "redux";
import products from "./ProductsReducer";
import brands from "./BrandsReducer";
import colors from "./ColorsReducer";
import sizes from "./SizesReducer";
import users from "./UserReducer";
import carts from "./CartReducer";

const rootReducer = combineReducers({
    products,
    brands,
    colors,
    sizes,
    users,
    carts
});

export default rootReducer;