import { DoubleRightOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React, { useState } from 'react'
import './style.scss'
import Cookies from 'js-cookie'

const SecondNav = () => {

    const [user, setUser] = useState(Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {})

    return (
        <>
            <Card
                className="category-item-card"
                hoverable
                cover=""
            >
                {
                    (user && user.id) ? <div className="list-feature">
                        {
                            user.role === 0 ?
                                <div>
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
                                </div>
                                : <div></div>
                        }
                        {[1, 2].includes(user.role) && <div>
                            <DoubleRightOutlined /><a href="/lich-hoc">Lịch học</a>
                        </div>}
                        {user.role === 2 && <div>
                            <DoubleRightOutlined /><a href="/dang-ky-mon-hoc">Đăng ký môn học</a>
                        </div>}
                    </div>
                        :
                    <div>
                        Vui lòng đăng nhập!!
                    </div>
                }
            </Card>
        </>
    )
}

export default SecondNav