import { DoubleRightOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import './style.scss'

const SecondNav = () => {
    return (
        <>
            <Card
                className="category-item-card"
                hoverable
                cover=""
            >
                <div className="list-feature">
                    <div>
                        <DoubleRightOutlined /><a href="/chuyen-nganh">Quản lý chuyên ngành</a>
                    </div>
                    <div>
                        <DoubleRightOutlined /><a href="/mon-hoc">Quản lý môn học</a>
                    </div>
                    <div>
                        <DoubleRightOutlined /><a href="/lop-hoc-phan">Quản lý lớp học phần</a>
                    </div>
                    <div>
                        <DoubleRightOutlined /><a href="/quan-ly-lich-hoc">Quản lý lịch học</a>
                    </div>
                    <div>
                        <DoubleRightOutlined /><a href="/lich-hoc">Lịch học</a>
                    </div>
                    <div>
                        <DoubleRightOutlined /><a href="/dang-ky-mon-hoc">Đăng ký môn học</a>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default SecondNav