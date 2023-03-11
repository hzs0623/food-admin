import { Upload, Modal, Form, Input, Button,Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect } from 'react'
import { upload } from 'http/upload'
import { getAreaCode } from 'http/area'

import Map from '../components/Map/index'


const mockForm = {
    "storeName": "test",
    "introduction": "测试",
    "categoryId": "2",
    "province": "440000",
    "city": "440300",
    "latitude": 22.5335,
    "longitude": 113.9294,
    "address": "南山区西丽街道",
    "businessLicense": "10012",
    "agentId": "1",
    "linkman": "daes",
    "phone": "17723595689",
    "telephone": "17723595689",
    "storeUrl": "111_20233711233738.png"
}

export default function App(props = {}) {
    const formRef = useRef(null);
    const [showMap, setShowMap] = useState(false)
    const [file, setFile] = useState([])
    const [areaList, setAreaList] = useState([]) // 省列表
    const [cityList, setCityList] = useState([]) // 城市列表
    const [countyList, setCountyList] = useState([]) // 城市列表

    //文件发送请求事件
    const getFilesHandle = () => {
        if (!file.length) return
        const formData = new FormData();
        file.forEach(item => formData.append('file', item))
        return upload(formData)
    }

    useEffect(() => {
        getAreaCode().then(list => {
            setAreaList(list)
            setTimeout(() => {
                formRef.current?.setFieldsValue(mockForm) // mock数据
            }, 2000)
        })
    },[])

    const submitForm = async (data) => {
        const updateRes = await getFilesHandle()
        const storeUrl = updateRes?.data || ''
        props.change({
            ...data,
            storeUrl
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
        <Modal width={1000} title="新增店铺" onCancel={props.onCancel} footer={null} open={props.open}>
            <Form ref={formRef} onFinish={submitForm}>
                <Form.Item name="storeName" label="店铺名称" rules={[{ required: true }]}>
                    <Input placeholder="请输入店铺名称" />
                </Form.Item>

                <Form.Item name="introduction" label="店铺介绍">
                    <Input />
                </Form.Item>

                <Form.Item name="categoryId" label="分类id" rules={[{ required: true }]}>
                    <Input placeholder="请输入分类id" />
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
