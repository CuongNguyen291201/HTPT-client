import React from 'react'
import './style.scss'
import MainLayout from '../MainLayout/MainLayout'
import { Button, Card, Col, Input, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct } from '../../redux/reducers/product.slice';

const { Search } = Input;

const SearchComponent = () => {
    const dispatch = useDispatch();
    const { productSearch } = useSelector(state => state.productReducer);

    const onSearch = async (value) => {
        dispatch(searchProduct(value.toLowerCase().trim()));
    }

    return (
        <MainLayout>
            <div className="width-layout">
                <div className="search-title">Tìm kiếm sản phẩm</div>
                <Search
                    placeholder="Tên sản phẩm ..."
                    allowClear
                    enterButton="Tìm"
                    size="large"
                    onSearch={onSearch}
                />
            </div>

            <div className="search-result">
                <Row className="" justify="space-between" gutter={[8, 8]}>
                    {productSearch && productSearch.map(item => (
                        <Col className="centered-col" key={item._id} sm={24} md={12} lg={5}>
                            <a href={`/product/${item._id}`}>
                                <Card
                                    className="category-item-card"
                                    hoverable
                                    cover={<img alt={item.name} src={item.image} />}
                                >
                                    <Row>
                                        <h2 style={{ textAlign: 'center' }}>{item.name}</h2>
                                    </Row>
                                    <Row>
                                        <p type="secondary">{`$${item.price}`}</p>
                                    </Row>
                                </Card>
                            </a>
                        </Col>
                    ))}
                </Row>
            </div>
        </MainLayout>
    )
}

export default SearchComponent