import { Button, Col, Descriptions, Row, Typography } from 'antd'
import React, { useCallback, useEffect } from 'react'
import MainLayout from '../MainLayout/MainLayout'
import person from '../../media/person.jpg'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../redux/reducers/product.slice'
import { updateCart } from '../../redux/reducers/user.slice'

const { Text } = Typography;
const { Item } = Descriptions;

const ProductDetail = () => {
    const { _id, name, cart } = useSelector((state) => state.userReducer)
    const { product } = useSelector((state) => state.productReducer)
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProductById(id));
    }, [])
    
    const handleAddCart = useCallback(() => {
        let newCart = [...cart, product];
        dispatch(updateCart(newCart, _id))
    }, [product])

    // console.log('product', product)
    console.log('name', name)
    console.log('cart', cart, _id)

    return (
        <MainLayout>
            <div className="width-layout">
                <Row justify="space-around">
                    <Col sm={24} lg={12}>
                        <img src={person} />
                    </Col>

                    <Col sm={24} lg={12}>
                        <Descriptions title={product.title} column={1}>
                            <Item key="price" label="Price" className="price-description">
                                <Text type="secondary">${product.price}</Text>
                            </Item>
                            <Item key="desc" label="Description">
                                <div>{product.desc}</div>
                            </Item>
                            <Item key="button" label="">
                                <Button type="primary" onClick={() => handleAddCart()}>
                                    Add To Cart
                                </Button>
                            </Item>
                        </Descriptions>
                    </Col>
                </Row>
            </div>
        </MainLayout>
    )
}

export default ProductDetail