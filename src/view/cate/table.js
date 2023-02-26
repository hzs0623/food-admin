import { Space, Table, Tag } from 'antd';
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
        // render: (text) => <a>{text}</a>,
    },
    {
        title: '父级分类ID',
        dataIndex: 'parentId',
        key: 'parentId',
    },
    {
        title: '店铺ID',
        dataIndex: 'storeId',
        key: 'storeId',
    },
    {
        title: '创建时间',
        dataIndex: 'crateDate',
        key: 'crateDate',
    },
    {
        title: '类型',
        key: 'type',
        dataIndex: 'type',
        render: (_, { type }) => {
            const color = type == 1 ? 'geekblue' : 'green';
            return (<Tag color={color} key={type}>
                { type == 1 ? '平台' : '店铺' }
            </Tag>)
        },
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>更新</a>
                <a>删除</a>
            </Space>
        ),
    },
];

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

const App = (props) => {
    return (<Table columns={columns} dataSource={props.list} loading={props.loading} />)
};

export default App;