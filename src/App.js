import './App.css';
import 'antd/dist/reset.css';
import Product from './page/Product';
import { Routes, Route } from "react-router-dom";
import Users from './page/Users';

function App() {
    return (
        <>
            <Routes>
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
