import { Card, Button, Input, Table, Popconfirm, Space, Tag, Form, Select } from 'antd';
import { useState  } from 'react'
import Map from '../components/Map'

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState('')
    const submitForm = () => {
    }

    const onAdd = () => {
        setIsModalOpen(true)
    }

    const mapChange = (data) => {
        console.log(data)
        setIsModalOpen(false)
        setForm(data)
    }

    return (<>
        <Card>
            <Form layout="inline" onFinish={submitForm}>
                <Form.Item name="categoryId" label="店铺ID">
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
                            type="primary"
                            htmlType="button"
                            onClick={onAdd}
                        >
                            新增
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </Card>

        <Card style={{ marginTop: 20 }}>
            {/* <Table 
            columns={columns} 
            dataSource={tabList} 
            loading={loading} 
            rowKey={ r => r.id } 
            /> */}
            
        </Card>

        <Map open={ isModalOpen } onCancel={ () => { setIsModalOpen(false) } } change={ mapChange } ></Map>
    </>)
}

export default App;