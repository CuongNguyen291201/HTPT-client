import { InputNumber } from 'antd'
import React from 'react'
import { DeleteOutlined } from '@ant-design/icons';

const CartItem = () => {
    return (
        <div>
            <div className="featured-pp">
                <a href="/">{featured_image && <img src={featured_image} />}</a>
            </div>
            <div className="description">
                <a>
                    <Title level={4}>{name}</Title>
                    <div>
                        <Text
                            type="secondary"
                            delete={on_sale}
                            className={`${on_sale ? 'on_sale' : 'regular'}`}
                        >
                            ${regular_price}
                        </Text>
                        {on_sale && <Text style={{ marginLeft: 10 }}>${sale_price}</Text>}
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