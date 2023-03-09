import './App.css';
import 'antd/dist/reset.css';
import Product from './page/Product';
import { Routes, Route } from "react-router-dom";
import Users from './page/Users';
import Homepage from './page/Homepage';
import ProductDetail from './component/ProductDetail';
import Cart from './component/Cart';
import Login from './component/Login';
import Register from './component/Register';

function App() {
    return (
        <>
            <Routes>
                <Route path="/">
                    <Route index element={<Homepage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                <Route path="/admin">
                    {/* <Route index element={<Home />} /> */}
                    <Route path="product" element={<Product />} />
                    <Route path="user" element={<Users />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
