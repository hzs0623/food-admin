import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, theme, Button } from 'antd';
import React, { useState } from 'react';
const { Header, Sider, Content } = Layout;
import './index.css'
import { Outlet } from 'react-router-dom'
import Menu from './menu'


const App = () => {
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const outLogin = () => {
        localStorage.removeItem('user_token')
        location.href = '/login'
    }

    return (
        <Layout className='layout-page'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt=""/>
                    food admin</div>
                <Menu />
                <div className='layout-out'>
                    <Button type="link" onClick={outLogin}>注销</Button>
                </div>
            </Sider>

            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
                    }}
                >
                    <Outlet />
                </Content>


            </Layout>
        </Layout>
    );
};
export default App;