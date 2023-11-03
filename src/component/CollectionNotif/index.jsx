import React from 'react'
import banner from '../../media/banner-about.jpg'
import { Card, Col, Row } from 'antd'
import './style.scss'
import SecondNav from '../MainLayout/SecondNav';

const CollectionNotif = () => {
    return (
        <div className="with-layout">
            <p className="title-section">Đại học Hà Nội</p>

            <Row className="" justify="space-between" gutter={[8, 8]}>
                <Col className="centered-col" sm={24} md={12} lg={18}>
                    <Card
                        className="category-item-card"
                        hoverable
                        cover=""
                    >
                        <img className="img-banner" alt="" src={banner} />
                        <div className="content-notif">
                            <Row className="" justify="space-between" gutter={[8, 8]}>
                                <Col className="centered-col" sm={24} md={12} lg={10}>
                                    <div className="">
                                        <div>
                                            Thông báo: Các thông báo quan trọng đến các lớp học phần trong Học kỳ I - năm học 2023 - 2024
                                        </div>
                                    </div>
                                </Col>
                                <Col className="centered-col" sm={24} md={12} lg={14}>
                                    <Card
                                        className="category-item-card"
                                        hoverable
                                        cover=""
                                    >
                                        <div>Thông báo V/v: Mở hệ thống Đăng ký chuyên ngành</div>
                                        <div>Thông báo V/v: Đăng ký môn học thay thế tốt nghiệp/ Đồ án tốt nghiệp các ngành khối kỹ thuật</div>
                                        <div>Thông báo V/v: Yêu cầu sinh viên kiểm tra điểm học kỳ II và học kỳ phụ (hè) năm học 2022-2023</div>
                                        <div>Thông báo: Về việc đăng ký học ghép học kỳ 1 năm học 2023 - 2024</div>
                                        <div>Thông báo: kết quả giải quyết đơn hỗ trợ đăng ký học kỳ 1 năm học 2023-2024</div>
                                        <div>Thông báo: Lịch đăng ký học kỳ 1 năm học 2023-2024 tuần từ 17/7 đến 23/7/2023</div>
                                        <div>Thông báo: Lịch đăng ký học kỳ 1 năm học 2023-2024 tuần từ 10/7 đến 16/7/2023</div>
                                        <div>Thông báo: Lịch đăng ký học kỳ 1 năm học 2023-2024 tuần 03-09/07/2023</div>
                                        <div>Hướng dẫn sử dụng cổng thông tin điện tử quản lý đào tạo</div>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>

                <Col className="centered-col" sm={24} md={12} lg={6}>
                    <SecondNav />
                </Col>

            </Row>
        </div>
    )
}

export default CollectionNotif