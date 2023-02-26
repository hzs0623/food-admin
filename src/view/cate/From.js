import { Button, Form, Input } from 'antd';

const App = (props) => {
    return (
        <Form layout="inline" onFinish={props.submit}>
            <Form.Item  name="parentId" label="分类ID">
                <Input placeholder="请输入分类ID" />
            </Form.Item>

            <Form.Item  name="storeId" label="店铺ID">
                <Input placeholder="请输入店铺ID" />
            </Form.Item>

            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        查询
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};

export default App
