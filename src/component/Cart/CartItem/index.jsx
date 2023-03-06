import { InputNumber } from 'antd'
import React from 'react'
import { DeleteOutlined } from '@ant-design/icons';
import guitar from '../../media/guitar.jpg'


const CartItem = () => {
    return (
        <div>
            <div className="featured-pp">
                <a href="#"><img src={guitar} /></a>
            </div>
            <div className="description">
                <a href="#">
                    <Title level={4}>Premium Quality</Title>
                    <div>
                        <Text type="secondary" className='regular'>$12</Text>
                    </div>
                </a>
            </div>

            <div className="quantity-control">
                <InputNumber
                    min={1}
                    value={1}
                    onChange={() => { }}
                />
            </div>
            <div className="delete">
                <DeleteOutlined onClick={() => { }} />
            </div>
        </div>
    )
}

export default CartItem