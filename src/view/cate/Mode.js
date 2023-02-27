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

import { useState, useRef, useEffect } from 'react';
import { upload } from 'http/upload'
import { addCate, updateCate } from 'http/cate'


const DForm = (props) => {
    const formRef = useRef(null);
    const [file, setFile] = useState([])
    const [selectList, setSelectList] = useState([])

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


    const onFinish = async (values) => {
        const updateRes = await getFilesHandle()
        const categoryImg = updateRes?.data || ''

        if (props.edit) {
            await updateCate({
                ...props.updateData,
                ...values,
                status: Number(values.status)
            })
        } else {
            await addCate({
                ...values,
                categoryImg
            })
        }
        props.handleOk()
        onReset()
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

    const changeRadio = ({ target: { value } }) => {
        formRef.current?.setFieldsValue({ parentId: '' }) // 请空父级id
        const arr = []
        props.list.forEach(item => {
            if (item.type == value) {
                arr.push({
                    value: item.id,
                    label: item.categoryName
                })
            }
        })

        setSelectList(arr)
    }

    useEffect(() => {
        if (!props.edit) {
            onReset()
            return
        }
        formRef.current?.setFieldsValue({
            ...props.updateData,
            type: props.updateData?.type + ''
        })
    }, [props.updateData])

    return (
        <>
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
                <Form.Item label="类型" name="type" rules={[
                    {
                        required: true,
                        message: 'Please input your type!',
                    },
                ]}>
                    <Radio.Group onChange={changeRadio}>
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

                <Form.Item label="父级ID" name="parentId">
                    <Select
                        options={selectList}
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


                <Form.Item label="Upload" rules={[
                    {
                        required: true,
                        message: 'Please Upload!',
                    },
                ]}>
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
    const handleOk = () => {
        props.change({ fetch: true })
    };
    const handleCancel = () => {
        props.change()
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
                <DForm list={props.list} edit={props.type === 'update'} updateData={props.updateData} handleOk={handleOk}></DForm>
            </Modal>
        </>
    );
};
export default App;