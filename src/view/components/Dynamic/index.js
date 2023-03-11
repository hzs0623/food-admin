import {
    Form,
    Card,
    Button,
} from 'antd';

import { useRef } from 'react'
import { getFormConfig } from './core/config'
import DynamicComponent from './core/DynamicComponent'


export default function App(props = {}) {
    const { formConfig = [], formOption = {}, tabbalConfig = [] } = props
    formOption.layout = 'inline'
    const formRef = useRef(null);
    const { formConfigs } = getFormConfig(formConfig)

    const onReset = () => {
        formRef.current?.resetFields();
    };


    return <>
        <Card>
            <Form
                ref={formRef}
                {...formOption}
            >
                {formConfigs.map((item) => (
                    <Form.Item key={item.name} name={item.name} label={item.label} rules={item.rules}  >
                        <DynamicComponent useDefaultPath={null} is={item.comp} {...item} />
                    </Form.Item>
                ))}
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
                            onClick={onReset}
                        >
                            清空
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </Card>

        <Card style={{ marginTop: 20 }}></Card>
    </>
}