import { Upload, Modal, Form, Input, Button,Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect } from 'react'
import { upload } from 'http/upload'
import { getAreaCode } from 'http/area'
import { getCateList } from 'http/cate'

import Map from '../components/Map/index'

export default function App(props = {}) {
    const formRef = useRef(null);
    const [showMap, setShowMap] = useState(false)
    const [cateList, setcateList] = useState([]);
    const [file, setFile] = useState([])
    const [areaList, setAreaList] = useState([]) // 省列表
    const [cityList, setCityList] = useState([]) // 城市列表
    const [countyList, setCountyList] = useState([]) // 城市列表

    const title = props.updateData ? '修改店铺' : '新增店铺'

    //文件发送请求事件
    const getFilesHandle = () => {
        if (!file.length) return
        const formData = new FormData();
        file.forEach(item => formData.append('file', item))
        return upload(formData)
    }

    useEffect(() => {
        getAreaCode().then(list => { // 初次渲染添获取所有城市
            setAreaList(list)
        })
        getCateList({ pageNum: 1, pageSize: 10, storeId: '', parentId: '' }).then(d => {
            setcateList(d?.data?.map(item => {
                return { value: item.id, label: item.categoryName }
            }))
        })
    },[])

    useEffect(() => {
        if (props.updateData) {
            formRef.current?.setFieldsValue(props.updateData)
        } else {
            formRef.current?.resetFields();
        }
    }, [props.updateData])

    const submitForm = async (data) => {
        const updateRes = await getFilesHandle()
        const storeUrl = updateRes?.data || ''
        props.change({
            item: {
                ...data,
                storeUrl
            },
            type: props.updateData ? 'update' : 'add'
        })
    }

    const uploadProps = {
        multiple: true,
        action: null,
        onChange: (info) => {
            setFile([info.file, ...file])
            return false;
        },
        beforeUpload() {
            return false;
        },
        showUploadList: true
    };

    function mapChange(data) {
        setShowMap(false)
        formRef.current?.setFieldsValue(data) // 设置经纬度
    }

    async function areaChange(v, { areaId }) {
        formRef.current?.setFieldsValue({
            city: '',
            county: ''
        }) 
        setCountyList([])
        const data = await getAreaCode(areaId)   
        setCityList(data)
    }

    async function cityChange(v, { areaId }) {
        formRef.current?.setFieldsValue({ county: '' })
        const data = await getAreaCode(areaId)
        setCountyList(data)
    }

    return <>
        <Modal width={1000} title={title} onCancel={props.onCancel} footer={null} open={props.open}>
            <Form ref={formRef} onFinish={submitForm}>
                <Form.Item name="storeName" label="店铺名称" rules={[{ required: true }]}>
                    <Input placeholder="请输入店铺名称" />
                </Form.Item>

                <Form.Item name="introduction" label="店铺介绍">
                    <Input />
                </Form.Item>

                <Form.Item name="categoryId" label="分类id" rules={[{ required: true }]}>
                    <Select
                        style={{ width: 120 }}
                        options={cateList}
                    />
                </Form.Item>

                <Form.Item name="province" label="省">
                    <Select
                        style={{ width: 120 }}
                        options={areaList}
                        placeholder="请选择省"
                        onChange={ areaChange }
                    />
                </Form.Item>

               {cityList.length  !== 0 && <Form.Item name="city" label="城市">
                    <Select
                        style={{ width: 120 }}
                        options={cityList}
                        placeholder="请选择城市"
                        onChange={ cityChange }
                    />
                </Form.Item>}

                {countyList.length  !== 0 && <Form.Item name="county" label="县">
                    <Select
                        style={{ width: 120 }}
                        options={countyList}
                        placeholder="请选择县"
                    />
                </Form.Item>}
   
                <Form.Item name="latitude" label="经度" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="longitude" label="纬度" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item >
                    <Button onClick={() => setShowMap(true)}>选择经纬度</Button>
                </Form.Item>

                <Form.Item name="address" label="营业地址" rules={[{ required: true }]}>
                    <Input placeholder="请输入营业地址" />
                </Form.Item>

                <Form.Item name="businessLicense" label="营业执照" >
                    <Input placeholder="请输入营业执照" />
                </Form.Item>

                <Form.Item name="agentId" label="代理商ID" rules={[{ required: true }]}>
                    <Input placeholder="请输入代理商ID" />
                </Form.Item>


                <Form.Item name="linkman" label="联系人" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="phone" label="联系人手机号">
                    <Input />
                </Form.Item>
                <Form.Item name="telephone" label="联系人电话" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="店铺头像" rules={[
                    {
                        required: true,
                        message: 'Please Upload!',
                    },
                ]}>
                    <Upload {...uploadProps}>
                        <Button icon={<PlusOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            确认
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </Modal>

        <Map open={showMap} onCancel={() => setShowMap(false)} change={mapChange} ></Map>
    </>
}
