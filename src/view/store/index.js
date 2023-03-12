import { Card, Button, Input, Table, Popconfirm, Space, Tag, Form, Select, message } from 'antd';
import { useState, useRef, useEffect } from 'react'
import Map from '../components/Map/index'
import AddStore from './AddModal'
import { addStoreAPi, getStoreListAPi, updateStoreAPi } from 'http/store/index'
import { getCateList } from 'http/cate'


const App = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [cateList, setcateList] = useState([]);
    const [tabList, settabList] = useState([])
    const [loading, setloading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddMoal, setIsAddMoal] = useState(false);
    const [formData, setForm] = useState({ pageNum: 1, pageSize: 10 })
    const formRef = useRef(null);
    const [updateData, setUpdateData] = useState(null)


    const columns = [
        {
            title: '店铺id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '店铺名称',
            dataIndex: 'storeName',
            key: 'storeName',
        },
        {
            title: '店铺头像',
            dataIndex: 'storeUrl',
            key: 'storeUrl',
            render(_, { storeUrl }) {
                return storeUrl && <a href={storeUrl} target="_blank">点击查看</a>
            }
        },
        {
            title: '店铺地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '店铺分类',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render(_, { categoryId }) {
                const currentList = cateList.filter(item => item.value == categoryId)
                return (<>
                    {currentList[0].label}
                </>)
            }
        },
        {
            title: '城市',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: '店铺介绍',
            dataIndex: 'introduction',
            key: 'introduction',
        },
        {
            title: '店铺状态',
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
                    {colorMap[status].text}
                </Tag>)
            }
        },
        {
            title: '联系人',
            dataIndex: 'linkman',
            key: 'linkman',
        },
        {
            title: '联系人手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '联系人电话',
            dataIndex: 'telephone',
            key: 'telephone',
        },
        {
            title: '代理商ID',
            dataIndex: 'agentId',
            key: 'agentId',
        },
        {
            title: '营业执照',
            dataIndex: 'businessLicense',
            key: 'businessLicense',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space key={record.parentId + record.id} size="middle">
                    <a onClick={() => {
                        setUpdateData(record)
                        setIsAddMoal(true)
                    }}>修改</a>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getCateList({ pageNum: 1, pageSize: 10, storeId: '', parentId: '' }).then(d => {
            setcateList(d?.data?.map(item => {
                return { value: item.id, label: item.categoryName }
            }))
        })
    }, [])



    const getList = async (value) => {
        setloading(true)
        value = value ? value : formData
        const res = await getStoreListAPi(value)
        const { data } = res || {}
        settabList(data)
        setloading(false)
    }

    const submitForm = (data) => {
        setForm({
            ...formData,
            ...data
        })
        getList({
            ...formData,
            ...data
        })
    }

    const onAdd = () => {
        setUpdateData(null)
        setIsAddMoal(true)
    }

    const storeChange = async ({ item: value, type }) => {
        if (type === 'add') {
            await addStoreAPi(value)
        } else {
            await updateStoreAPi(Object.assign(updateData, value))
        }
        setUpdateData(null)
        messageApi.success(`${type === 'add' ? '添加' : '新增'}店铺成功`)
        setIsAddMoal(false)
        getList()
    }

    const mapChange = (data) => {
        setIsModalOpen(false)
        formRef.current?.setFieldsValue(data) // 设置经纬度
    }

    return (<>
        {contextHolder}
        <Card>
            <Form ref={formRef} layout="inline" onFinish={submitForm} initialValues={{
                longitude: '113.9294',
                latitude: '22.5335',
            }} >
                <Form.Item name="categoryId" label="分类ID" rules={[{ required: true }]}>
                    <Select
                        style={{ width: 120 }}
                        options={cateList}
                    />
                </Form.Item>

                <Form.Item name="storeName" label="店铺名称">
                    <Input style={{ width: '100px' }} />
                </Form.Item>

                <Form.Item name="longitude" label="经度" rules={[{ required: true }]}>
                    <Input  />
                </Form.Item>

                <Form.Item name="latitude" label="纬度" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" onClick={() => { setIsModalOpen(true) }}>
                        地图经纬度
                    </Button>
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
                            type="default"
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
            <Table
                columns={columns}
                dataSource={tabList}
                loading={loading}
                rowKey={r => r.id}
            />

        </Card>

        <Map open={isModalOpen} onCancel={() => { setIsModalOpen(false) }} change={mapChange} ></Map>

        <AddStore open={isAddMoal} onCancel={() => { setIsAddMoal(false) }} change={storeChange} updateData={updateData} ></AddStore>
    </>)
}

export default App;