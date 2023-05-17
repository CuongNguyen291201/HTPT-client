import React from 'react'
import guitar from '../../media/guitar.jpg'
import background from '../../media/background.png'
import person from '../../media/person.jpg'
import { Card, Col, Row } from 'antd'
import './style.scss'
import { mapCategory } from '../../utils/constrant';

const { Meta } = Card;

const CollectionList = () => {
    return (
        <div className="with-layout">
            <p className="title-section">Bộ sưu tập</p>

            <Row className="" justify="space-between" gutter={[8, 8]}>
                {[1, 2, 3].map(item => {
                    let imageSrc = "";
                    item === 1 ? imageSrc = person : item === 2 ? imageSrc = guitar : imageSrc = background
                    return (
                        <Col className="centered-col" key={item} sm={24} md={12} lg={7}>
                            <a href={`/collection/${item}`}>
                                <Card
                                    className="category-item-card"
                                    hoverable
                                    cover={
                                        item ? <img alt="example" src={imageSrc} /> : null
                                    }
                                >
                                    <Meta title={mapCategory[item]} description="" />
                                </Card>
                            </a>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default CollectionList