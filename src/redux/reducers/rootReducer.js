import { combineReducers } from "redux";
import productReducer from "./product.slice";
import userReducer from "./user.slice";
import orderReducer from "./order.slice";

const combines = combineReducers({
    productReducer,
    userReducer,
    orderReducer
});

export default combines;