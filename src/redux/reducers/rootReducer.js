import { combineReducers } from "redux";
import productReducer from "./product.slice";
import userReducer from "./user.slice";

const combines = combineReducers({
    productReducer,
    userReducer
});

export default combines;