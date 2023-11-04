import { combineReducers } from "redux";
import productReducer from "./product.slice";
import userReducer from "./user.slice";
import monHocReducer from "./monhoc.slice"
import chuyenNganhReducer from "./chuyennganh.slice"
import lichHocReducer from "./lichhoc.slice"
import lopHocPhanReducer from "./lophocphan.slice"
const combines = combineReducers({
    productReducer,
    userReducer,
    monHocReducer,
    chuyenNganhReducer,
    lichHocReducer,
    lopHocPhanReducer
});

export default combines;