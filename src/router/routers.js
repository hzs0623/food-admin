import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { lazy } from 'react';

const menuRouter = [
    {
        name: '用户管理',
        path: '/user',
        icon: <AppstoreOutlined />,
        children: [
            {
                name: '用户列表',
                path: '/user/list',
                component: () => '用户列表',
            }
        ],
    },
    {
        name: '分类管理',
        path: '/cate',
        icon: <MailOutlined />,
        children: [
            {
                name: '分类查询',
                path: 'cate/list',
                component: lazy(() => import('../view/cate')),
            }
        ]
    },
    {
        name: '标签管理',
        path: '/label',
        icon: <SettingOutlined />,
        children: [
            {
                name: '标签查询',
                path: 'label/list',
                component: () => '标签查询',
            }
        ]
    },
]


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const getMenus = (list = []) => {
    const arr = []
    list.forEach(item => {
        if (item.component || item.children) {
            arr.push(getItem(item.name, item.path, item.icon, getMenus(item.children), item.label, item.type))
        }
    })
    return arr.length && arr 
}

const menuConfig = getMenus(menuRouter)

export {
    menuConfig,
    menuRouter
}
