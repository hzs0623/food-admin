import { PlusOutlined } from '@ant-design/icons';
import {
    Modal,
    Button,
    Form,
    Input,
    Radio,
    Upload,
} from 'antd';

import { useState, useRef } from 'react';
import { upload } from 'http/upload'

const App = (props) => {

    const formRef = useRef(null);
    const [file, setFile] = useState([])
    const [currentType, setcurrentType] = useState([])

    const handleOk = (item) => {
        props.change(item)
    };
    const handleCancel = () => {
        onReset()
        props.handleCancel && props.handleCancel()
    };


    //文件发送请求事件
    const getFilesHandle = () => {
        if (!file.length) return
        const formData = new FormData();
        file.forEach(item => formData.append('file', item))
        return upload(formData)
    }

    const onReset = () => {
        setFile([])
        formRef.current?.resetFields();
    };

    const changeRadio = ({ target: { value } }) => {
        setcurrentType(value)
    }

    const onFinish = async (values) => {
        const updateRes = await getFilesHandle()
        const fileUrl = updateRes?.data || ''
        onReset()
        handleOk({
            ...values,
            fileUrl
        })
   
    };

    const uploadProps = {
        multiple: true,
        action: null,
        onChange: (info) => {
            console.log(info.file)
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
            <Modal
                title='新增轮播图'
                open={props.show}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                <Form
                    ref={formRef}
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
                    <Form.Item label="轮播图类型" name="type" rules={[
                        {
                            required: true,
                            message: 'Please input your type!',
                        },
                    ]}>
                        <Radio.Group onChange={changeRadio}>
                            <Radio value="1"> 平台 </Radio>
                            <Radio value="2"> 店铺 </Radio>
                        </Radio.Group>
                    </Form.Item>


                     {
                        currentType == 2 &&
                        <Form.Item label="店铺ID" name="storeId">
                            <Input />
                        </Form.Item>
                    }


                    <Form.Item label="Upload" rules={[
                        {
                            required: true,
                            message: 'Please Upload!',
                        },
                    ]}
                    >   
                        <div key={ Math.random() }>
                            <Upload  {...uploadProps}>
                                <Button icon={<PlusOutlined />}>Click to Upload</Button>
                                { file.map(item => (<p key={item.name}>{ item.name }</p>)) }
                            </Upload>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default App;