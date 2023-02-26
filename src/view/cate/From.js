import { Button, Form, Input } from 'antd';
import React from 'react';

const App = (props) => {
    const formRef = React.useRef(null);
    const onReset = () => {
        formRef.current?.resetFields();
      };

    return (
        <Form  ref={formRef} layout="inline" onFinish={props.submit}>
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

            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        htmlType="button"
                        onClick={ onReset }
                    >
                        清空
                    </Button>
                )}
            </Form.Item>

            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        type="primary"
                        htmlType="button"
                        onClick={ props.onAdd }
                    >
                        新增
                    </Button>
                )}
            </Form.Item>

        </Form>
    );
};

export default App
