import { Space, Table, Tag, Popconfirm } from 'antd';

const App = (props) => {

    const columns = [
        {
            title: '分类ID',
            dataIndex: 'id',
            key: 'id',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: '分类名称',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        // {
        //     title: '父级分类ID',
        //     dataIndex: 'parentId',
        //     key: 'parentId',
        // },
        {
            title: '创建时间',
            dataIndex: 'crateDate',
            key: 'crateDate',
        },
        {
            title: '类型',
            key: 'type',
            dataIndex: 'type',
            render: (_, { type, parentId, id }) => {
                const color = type == 1 ? 'geekblue' : 'green';
                return (<Tag color={color} key={parentId + id}>
                    {type == 1 ? '平台' : '店铺'}
                </Tag>)
            },
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space key={record.parentId + record.id} size="middle">
                    <a onClick={ () => props.onUpdate(record) }>更新</a>

                    <Popconfirm
                        title="确定删除么"
                        onConfirm={() => {
                            props.onDelete(record)
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

    return (<Table 
        columns={columns} 
        dataSource={props.list} 
        loading={props.loading} 
        rowKey={ r => r.id } 
        />)
};

export default App;