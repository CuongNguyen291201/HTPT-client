import { combineReducers } from "redux";
import productReducer from "./product.slice";

const combines = combineReducers({
    productReducer
});

export default combines;