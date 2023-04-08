import { Button, Col, Descriptions, Row, Typography } from 'antd'
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
        let newCart = [...user.cart, product];
        const data = await apiUpdateCart(newCart, user._id);
        if (data && data.cart) {
            dispatch(updateCart(data.cart))
        }
    }

    console.log('user', user)

    return (
        <MainLayout>
            <div className="width-layout">
                <Row justify="space-around">
                    <Col sm={24} lg={12}>
                        <img src={product.image} />
                    </Col>

                    <Col sm={24} lg={12}>
                        <div className="main-product">
                            <div className="name-product">Name: {product.name}</div>
                            <div className="price-description">${product.price}</div>
                            <div className="product-description">{product.desc}</div>
                            <Button type="primary" onClick={() => handleAddCart()}>
                                Add To Cart
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </MainLayout>
    )
}

export default ProductDetail