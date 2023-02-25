import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
const { Header, Sider, Content } = Layout;
import './index.css'

import { Outlet } from 'react-router-dom'



const App = () => {
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onClick = (e) => {
        console.log('click ', e);
    };

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
        getItem('用户管理', 'user', <MailOutlined />, [
            getItem('用户列表', 'user/list'),
        ]),
        getItem('分类管理', 'cate', <AppstoreOutlined />, [
            getItem('分类查询', 'cate/list'),
            getItem('获取分类查询', 'cate/find'),
        ]),
        {
            type: 'divider',
        },
        getItem('标签管理', 'label', <SettingOutlined />, [
            getItem('标签列表', 'label/list'),
        ]),
    ];

    return (
        <Layout className='layout-page'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">food admin</div>
                <Menu
                    theme="dark"
                    onClick={onClick}
                    mode="inline"
                    items={items}
                />
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
                        padding: 24,
                        background: colorBgContainer,
                    }}
                >

                <Outlet />

                </Content>
            </Layout>
        </Layout>
    );
};
export default App;