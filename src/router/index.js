
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';

export const routers = [
    {
        path: '/',
        component: lazy(() => import('../pages/Layout/index')),
        children: [
            {
                path: '/',
                component: () => '主页',
            },
            {
                path: '/home',
                component: () => {
                    return (<div>home</div>)
                },
            },
        ]
    },
    {
        path: '/login',
        component: lazy(() => import('../pages/Login/index')),
        notAuth: true, // 不需要登录
    },
    {
        path: '*',
        component: lazy(() => import('../pages/NotFound')),
    }

]


function searchroutedetail(path, routes = routers) {
    let currentItem
    for (let item of routes) {
        if (item.path === path) {
            currentItem = item
        }
        if (!currentItem && item.children) {
            currentItem = searchroutedetail(path, item.children);
        }
    }
    return currentItem;
}


export function Router() {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const { pathname } = location;
        const routedetail = searchroutedetail(pathname);

        if (!routedetail || routedetail.notAuth) { // 没有找到路由
            return;
        }

        const token = localStorage.getItem("user_token");

        if (!token) {
            console.warn("请登录");
            navigate('/login');
            return;
        }

    }, [location]);


    function getRouter(routers = []) {
        if (!routers || routers.length === 0) return
        return routers.map((item, index) => {
            return (
                <Route
                    key={item.path + index}
                    path={item.path}
                    element={<item.component />}
                >
                    {getRouter(item.children)}
                </Route>
            );
        })
    }

    return (<Routes>
        {getRouter(routers)}
    </Routes>)
}