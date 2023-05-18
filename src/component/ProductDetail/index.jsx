import { Button, Col, Descriptions, Row, Typography, notification } from 'antd'
import React, { useEffect } from 'react'
import MainLayout from '../MainLayout/MainLayout'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../redux/reducers/product.slice'
import { apiUpdateCart } from '../../api/userApi'
import { updateCart } from '../../redux/reducers/user.slice'

const { Text } = Typography;
const { Item } = Descriptions;

const ProductDetail = () => {
    const user = useSelector((state) => state.userReducer)
    const { product } = useSelector((state) => state.productReducer)
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProductById(id));
    }, [])

    const handleAddCart = async () => {
        let _cart = [];
        if (user.cart) {
            _cart = [...user.cart];
            let oldProduct = user.cart.find(item => item._id === product._id);
            let newProduct = {};
            if (oldProduct && oldProduct.quantity) {
                newProduct = {
                    ...oldProduct,
                    quantity: oldProduct.quantity + 1
                }
                _cart = _cart.map(item => {
                    if (item._id === newProduct._id) {
                        item = newProduct;
                    }
                    return item;
                })
            } else {
                _cart = [..._cart, {
                    ...product,
                    quantity: 1
                }];
            }
        } else {
            _cart.push({
                ...product,
                quantity: 1
            });
        }
        const data = await apiUpdateCart(_cart, user._id);
        if (data && data.cart) {
            dispatch(updateCart(data.cart));
            notification.success({ message: "Đã thêm vào giỏ hàng!" });
        }
    }

    return (
        <MainLayout>
            <div className="width-layout">
                <Row justify="space-around">
                    <Col sm={24} lg={12}>
                        <img src={product.image} />
                    </Col>

                    <Col sm={24} lg={12}>
                        <div className="main-product">
                            <div className="name-product">Tên sản phẩm: {product.name}</div>
                            <div className="price-description">${product.price}</div>
                            <div className="product-description">{product.desc}</div>
                            {user._id && <Button type="primary" onClick={() => handleAddCart()}>
                                Thêm
                            </Button>}
                        </div>
                    </Col>
                </Row>
            </div>
        </MainLayout>
    )
}

export default ProductDetail