import { Card, Button, Table, Popconfirm, Space, Tag, Form, Select  } from 'antd';
import { useState } from 'react';
import { getSwipreList, deleteSwipre, addSwipreApi } from '../../http/swipre' 
const { Option } = Select;
import Model from './Model'

const App = () => {
    const [tabList, setList] = useState([])
    const [loading, setloading] = useState(false)
    const [type, setType] = useState('1')
    const [showAdd, setshowAdd] = useState(false)

    const submitForm = ({ type }) => {
        setType(type)
        getSwipreListData()
    }

    const getSwipreListData = async () => {
        setloading(true)
        const res = await getSwipreList({ type })
        const { data = [] } = res || {}
        setList(data)
        setloading(false)
    }

    const onAdd = () => {
        setshowAdd(true)
    }   

    const addChange = (item) => {
        setshowAdd(false)
        console.log(item)
    }

    const onDelete = async ({ id }) => {
        await deleteSwipre([id])
        getSwipreListData()
    }

    const columns = [
        {
            title: '图片地址',
            dataIndex: 'fileUrl',
            key: 'fileUrl',
            ellipsis: true,
            render: (_, { fileUrl }) => {
                return <a href={fileUrl} target="_blank">{ fileUrl }</a>
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render(_, { status, id }) {
                if (!status) return
                const colorMap = {
                    1: {
                        color: 'green',
                        text: '启用'
                    },
                    2: {
                        color: 'geekblue',
                        text: '停用'
                    },
                    3: {
                        color: 'red',
                        text: '冻结'
                    },
                }

                const color = colorMap[status].color;
                return (<Tag color={color} key={id}>
                    {  colorMap[status].text }
                </Tag>)
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space key={record.parentId + record.id} size="middle">
                    <Popconfirm
                        title="确定删除么"
                        onConfirm={() => {
                            onDelete(record)
                        }}
                        okText="确定"
                        cancelText="取消"
                    >
                        <a>删除</a>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    return (<>
        <Card>
            <Form  layout="inline" onFinish={submitForm}>
                <Form.Item  name="type" label="请选择轮播图类型"  rules={[{ required: true }]} initialValue={ type }>
                    <Select
                        style={{ width: 100 }}
                        placeholder="请选择轮播图类型"
                        allowClear
                        >
                        <Option value="1">平台</Option>
                        <Option value="2">店铺</Option>
                    </Select>
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
                            onClick={ onAdd }
                        >
                            新增
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </Card>

        <Card style={{ marginTop: 20 }}>
            <Table 
            columns={columns} 
            dataSource={tabList} 
            loading={loading} 
            rowKey={ r => r.id } 
            />

        </Card>

        <Model show={ showAdd } change= { addChange } handleCancel = { () => setshowAdd(false) } ></Model>
    </>)
};
export default App;