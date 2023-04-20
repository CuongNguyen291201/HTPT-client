import { Button, Col, InputNumber, Row } from 'antd'
import React from 'react'
import MainLayout from '../MainLayout/MainLayout'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons'
import { updateCart } from '../../redux/reducers/user.slice'
import { apiUpdateCart } from '../../api/userApi'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { createOrder } from '../../redux/reducers/order.slice'
import { useEffect } from 'react'
import { useState } from 'react'

const Cart = () => {
    const dispatch = useDispatch();
    const { cart, _id } = useSelector(state => state.userReducer);
    const [subTotal, setSubTotal] = useState(0);
    // const subTotal = cart.reduce((prev, current) => prev + (current.price * current.quantity), 0);

    useEffect(() => {
        let calculate = cart.reduce((prev, current) => prev + (current.price * current.quantity), 0);
        setSubTotal(calculate)
    }, [cart])
    

    const removeCartItem = async (itemId) => {
        let newCart = cart.filter(item => item._id !== itemId);
        const data = await apiUpdateCart(newCart, _id);
        if (data && data.cart) {
            dispatch(updateCart(data.cart))
        }
    }

    const handleCheckout = async (details) => {
        console.log('details', details)
        const order = {
            idUser: _id,
            idPayment: details.id,
            products: cart
        };
        dispatch(createOrder(order));
        await apiUpdateCart([], _id);
        dispatch(updateCart([]));
    }

    const handleUpdateCartItem = async (itemId, newQuantity) => {
        let newCart = [];
        if (newQuantity > 0) {
            newCart = cart.map(item => {
                if (item._id === itemId) {
                    let newItem = {
                        ...item,
                        quantity: newQuantity
                    }
                    item = newItem;
                }
                return item;
            })
        } else {
            newCart = cart.filter(item => item._id !== itemId);
        }
        const data = await apiUpdateCart(newCart, _id);
        if (data && data.cart) {
            dispatch(updateCart(data.cart))
        }
    }

    console.log('subTotal', subTotal, typeof subTotal)

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
                                                value={item.quantity}
                                                onChange={(count) => handleUpdateCartItem(item._id, count)}
                                            />
                                        </div>
                                        <div className="delete">
                                            <DeleteOutlined onClick={() => removeCartItem(item._id)} />
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
                                <span className="title-total">Total: {subTotal}$</span>
                            </div>
                        </div>

                        {/* <Button type="primary" danger onClick={() => handleCheckout()}>Checkout</Button> */}
                        <PayPalScriptProvider 
                            options={{ 
                                "client-id": "AZ6nie_mzghQEtG5OMD5IrqLObecywGdCvMnEUihJIZ87p_9ReBtQZXwLht2EpY1iJZCWHS1fJQW76po" 
                            }}
                        >
                            <PayPalButtons
                                style={{ layout: "horizontal" }} 
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    currency_code: "USD",
                                                    value: subTotal
                                                }
                                            }
                                        ]
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then(function (details) {
                                        handleCheckout(details)
                                    });
                                }}    
                            />
                        </PayPalScriptProvider>
                    </Col>
                </Row>
            </div>
        </MainLayout>
    )
}

export default Cart