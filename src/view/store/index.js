import { Card, Button, Input, Table, Popconfirm, Space, Tag, Form, Select } from 'antd';
import { useState, useRef,  useEffect } from 'react'
import Map from '../components/Map'
import AddStore from './AddModal'
import { addStoreAPi } from 'http/store/index'
import { getCateList } from 'http/cate'


const App = () => {
    const [cateList, setcateList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddMoal, setIsAddMoal] = useState(false);
    const [formData, setForm] = useState({ pageNum: 10, pageSize: 1 })
    const formRef = useRef(null);

    useEffect(() => {
        getCateList({ pageNum: 10, pageSize: 1, storeId: '', parentId: ''  }).then(d => {
            setcateList(d?.data?.map(item => {
                return { value: item.id, label: item.categoryName }
            }))
        })
    }, [])

 

    const getList = (formData) => {
        console.log(formData)
    }

    const submitForm = (data) => {
        setForm({
            // ...formData,
            ...data
        })
        getList({
            ...formData,
            ...data
        })
    }

    const onAdd = () => {
        setIsAddMoal(true)
    }

    const addChange = async (value) => {
        console.log(value)
       const res= await addStoreAPi(value)
       console.log(res, 'res')
    }

    const mapChange = (data) => {
        setIsModalOpen(false)
        formRef.current?.setFieldsValue(data) // 设置经纬度
    }

    return (<>
        <Card>
            <Form  ref={formRef}  layout="inline" onFinish={submitForm} >
                <Form.Item  name="categoryId" label="店铺ID" rules={[{ required: true }]}>
                    {/* <Input style={{ width: '100px' }} placeholder="输入店铺ID" /> */}
                    <Select
                        style={{ width: 120 }}
                        options={cateList}
                    />
                </Form.Item>

                <Form.Item  name="storeName"  label="店铺名称">
                    <Input style={{ width: '100px' }}  />
                </Form.Item>
                
                <Form.Item name="latitude" label="经度" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="longitude" label="纬度" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item >
                    <Button type="primary"  onClick={ () => {  setIsModalOpen(true) } }>
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
            {/* <Table 
            columns={columns} 
            dataSource={tabList} 
            loading={loading} 
            rowKey={ r => r.id } 
            /> */}
            
        </Card>

        <Map open={ isModalOpen } onCancel={ () => { setIsModalOpen(false) } } change={ mapChange } ></Map>

        <AddStore open={ isAddMoal } onCancel={ () => { setIsAddMoal(false) } } change={ addChange }></AddStore>
    </>)
}

export default App;