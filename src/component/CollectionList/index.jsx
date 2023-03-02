import React from 'react'
import guitar from '../../media/guitar.jpg'
import { Card, Col, Row } from 'antd'
import './style.scss'

const { Meta } = Card;

const CollectionList = () => {
    return (
        <div className="with-layout">
            <p className="title-section">Collections</p>

            <Row className="" justify="space-between" gutter={[8, 8]}>
                {[1, 2, 3].map(item => (
                    <Col className="centered-col" key={item} sm={24} md={12} lg={7}>
                        <a href="#">
                            <Card
                                className="category-item-card"
                                hoverable
                                cover={
                                    item ? <img alt="example" src={guitar} /> : null
                                }
                            >
                                <Meta title={item} description="" />
                            </Card>
                        </a>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default CollectionList