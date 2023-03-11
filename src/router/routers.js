import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined
} from '@ant-design/icons';

import UserList from '../view/user/index'
import CateList from '../view/cate'
import Swipre from '../view/swipre'

import widthUseNavigate from '../utils/widthUseNavigate'

const menuRouter = [
    {
        name: '用户管理',
        path: '/user',
        icon: <AppstoreOutlined />,
        children: [
            {
                name: '用户列表',
                path: '/user/list',
                component: UserList,
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
                path: '/cate/list',
                component: CateList,
            }
        ]
    },
    {
        name: '轮播图管理',
        path: '/swipre',
        icon: <SettingOutlined />,
        children: [
            {
                name: '轮播图管理',
                path: '/swipre/list',
                component: Swipre,
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
                path: '/label/list',
                component: () => '标签查询',
            }
        ]
    },
]

function menuUseNavigate(list = []) {
    list.forEach(item => {
        if (item.component) {
            item.component = widthUseNavigate(item.component)
        }
        menuUseNavigate(item.children)
    })
}

menuUseNavigate(menuRouter) // 每个组件加入路由跳转方法


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
