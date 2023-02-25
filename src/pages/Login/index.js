import { Button, Space } from 'antd';

const App = () => {
    const onClick = () => {
        localStorage.setItem("user_token", 1);
        location.href = '/'
    }

    return (<Space wrap>
        <Button type="primary" onClick={ onClick }>登录</Button>
    </Space>)
};

export default App;