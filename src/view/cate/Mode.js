import { PlusOutlined } from '@ant-design/icons';
import {
    Modal,
    Button,
    Form,
    Input,
    Radio,
    Select,
    Upload,
    Switch,
} from 'antd';

import { useState } from 'react';
import { upload } from 'http/upload'
import { addCate } from 'http/cate'


const DForm = (props) => {
    const [file, setFile] = useState([])

    //文件发送请求事件
    const getFilesHandle = () => {
        if (!file.length) return
        const formData = new FormData();
        file.forEach(item => formData.append('file', item))
        return upload(formData)
    }

    const onFinish = async (values) => {
        const updateRes = await getFilesHandle()
        const categoryImg = updateRes?.data || ''

        const res = await addCate({
            ...values,
            categoryImg
        })
        setFile([])
        props.handleOk(res)
    };

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

    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item label="类型" name="type" rules={[
                    {
                        required: true,
                        message: 'Please input your type!',
                    },
                ]}>
                    <Radio.Group>
                        <Radio value="2"> 店铺 </Radio>
                        <Radio value="1"> 平台 </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="分类名称" name="categoryName" rules={[
                    {
                        required: true,
                        message: 'Please input your categoryName!',
                    },
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item label="分类名称(维语)" name="wcategoryName">
                    <Input />
                </Form.Item>

                <Form.Item label="父级分类" name="parentId">
                    <Select
                        options={
                            props.list.map(item => {
                                return {
                                    value: item.id, 
                                    label: item.categoryName
                                }
                            })
                        }
                        allowClear={true}
                    >
                        
                    </Select>
                </Form.Item>


                {props.edit ? <Form.Item label="店铺ID" name="storeId">
                    <Input />
                </Form.Item> : ''}

                {props.edit ? <Form.Item label="是否展示" name="status" valuePropName="checked">
                    <Switch />
                </Form.Item> : ''}


                <Form.Item label="Upload">
                    <Upload {...uploadProps}>
                        <Button icon={<PlusOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

const App = (props) => {
    const handleOk = (res) => {
        props.change(res)
    };
    const handleCancel = () => {
        props.change(false)
    };
    return (
        <>
            <Modal
                title={props.title}
                open={props.show}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                <DForm list={ props.list } edit={ props.edit } handleOk={ handleOk }></DForm>
            </Modal>
        </>
    );
};
export default App;