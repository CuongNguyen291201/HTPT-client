import { Layout } from 'antd'
import React from 'react'
import MainNav from './MainNav'

const { Content } = Layout;

const MainLayout = ({ children }) => {
    return (
        <Layout>
            <MainNav />
            <Content>{children}</Content>
        </Layout>
    )
}

export default MainLayout