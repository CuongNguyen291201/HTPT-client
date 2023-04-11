import { Button, Col, InputNumber, Row } from 'antd'
import React from 'react'
import MainLayout from '../MainLayout/MainLayout'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons'

const Cart = () => {
    const dipatch = useDispatch();
    const { cart } = useSelector(state => state.userReducer);
    console.log('cart', cart)

    const removeCartItem = async () => {
        
    }

    const handleCheckout = async () => {

    }

    return (
        <MainLayout>
            <div className="width-content">
                <Row justify="space-between" gutter={[8, 8]}>
                    <Col sm={24} lg={12}>
                        <div className="list-cart-item">
                            {
                                cart && cart.map(item => (
                                    <div className={`cart-item`} key={item._id}>
                                        <div className="featured-pp">
                                            <a href={`/product/${item._id}`}>{item.image && <img className="" src={item.image} />}</a>
                                        </div>
                                        <div className="description">
                                            <div className="item-name">{item.name}</div>
                                            <div className="item-price">${item.price}</div>
                                        </div>
                                        <div className="quantity-control">
                                            <InputNumber
                                                // value={item.}
                                                // onChange={(count) => handleUpdateCartItem(count)}
                                            />
                                        </div>
                                        <div className="delete">
                                            <DeleteOutlined onClick={() => removeCartItem()} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </Col>

                    <Col sm={24} lg={10}>
                        <div className="cart-item cart-subtotal">
                            <h2>Order Summary</h2>
                            <div className="total-price">
                                <span className="title-total">Total</span>
                                <span className="price">1000</span>
                            </div>
                        </div>

                        <Button type="primary" danger onClick={() => handleCheckout()}>Checkout</Button>
                    </Col>
                </Row>
            </div>
        </MainLayout>
    )
}

export default Cart