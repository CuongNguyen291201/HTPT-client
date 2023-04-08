import { Col, InputNumber, Row } from 'antd'
import React from 'react'
import MainLayout from '../MainLayout/MainLayout'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons'
import { Title } from 'chart.js'

const Cart = () => {
    const dipatch = useDispatch();
    const { cart } = useSelector(state => state.userReducer);
    console.log('cart', cart)

    const removeCartItem = async () => {

    }

    return (
        <MainLayout>
            <div className="width-content">
                <Row justify="space-between" gutter={[8, 8]}>
                    <Col sm={24} lg={12}>
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
                    </Col>

                    <Col sm={24} lg={12}>

                    </Col>
                </Row>
            </div>
        </MainLayout>
    )
}

export default Cart