import './App.css';
import 'antd/dist/reset.css';
import MonHoc from './page/Monhoc';
import { Routes, Route } from "react-router-dom";
import Homepage from './page/Homepage';
import Login from './component/Login';
import Register from './component/Register';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRefeshToken } from './redux/reducers/user.slice';
import Cookies from 'js-cookie';
import Account from './component/Account';
import ChuyenNganh from './page/ChuyenNganh';
import LopHocPhan from './page/LopHocPhan';
import QuanLyLichHoc from './page/QuanLyLichHoc';
import LichHoc from './page/LichHoc';
import DangKyMonHoc from './page/DangKyMonHoc';

function App() {
    const dispatch = useDispatch();
    // const { _id, role, refresh_token } = useSelector((state) => state.userReducer)

    // useEffect(() => {
    //     let _token = refresh_token || Cookies.get('token');
    //     dispatch(userRefeshToken(_token));
    // }, [])

    return (
        <>
            <Routes>
                <Route path="/">
                    <Route index element={<Homepage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="profile" element={<Account />} />
                    <Route path="mon-hoc" element={<MonHoc />} />
                    <Route path="chuyen-nganh" element={<ChuyenNganh />} />
                    <Route path="lop-hoc-phan" element={<LopHocPhan />} />
                    <Route path="quan-ly-lich-hoc" element={<QuanLyLichHoc />} />
                    <Route path="lich-hoc" element={<LichHoc />} />
                    <Route path="dang-ky-mon-hoc" element={<DangKyMonHoc />} />
                </Route>

                {/* {_id && role && <Route path="/admin">
                </Route>} */}
            </Routes>
        </>
    );
}

export default App;
