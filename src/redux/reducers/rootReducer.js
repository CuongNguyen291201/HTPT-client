import { combineReducers } from "redux";
import userReducer from "./user.slice";
import monHocReducer from "./monhoc.slice"
import chuyenNganhReducer from "./chuyennganh.slice"
import lichHocReducer from "./lichhoc.slice"
import lopHocPhanReducer from "./lophocphan.slice"
import chiNhanhReducer from "./chinhanh.slice"
const combines = combineReducers({
    userReducer,
    monHocReducer,
    chuyenNganhReducer,
    lichHocReducer,
    lopHocPhanReducer,
    chiNhanhReducer
});

export default combines;