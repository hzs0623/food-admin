import { Card } from 'antd';
import Table from './table'
import DForm from './From'
import Mode from './Mode'
import { useState, useEffect } from 'react'

import { getCateList, removeCate } from '../../http/cate'

const App = () => {
    const [query, setQuery] = useState({ pageNum: 10, pageSize: 1, storeId: '', parentId: ''  })
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [showModel, setModel] = useState(false)

    const [updateData, setUpdateData] = useState({}) 
    const [typeMode, setTypeMode] = useState('add') // model类型（新增还是更新）

    const getList = async () => {
        setLoading(true)
        try {
            const res = await getCateList(query)
            const { records, total } = res.data || {}
            setList(records)
            setTotal(total)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getList()
    }, [])

    const findForm = ({ parentId = '', storeId = '' }) => {
        setQuery({
            ...query,
            pageNum: 10, 
            pageSize: 1,
            parentId,
            storeId
        })
        getList()
    }

    const onAdd = () => {
        setTypeMode('add')
        setModel(true)
    }

    // 关闭弹框
    const changeMode = (value) => {
        setModel(false)
        setUpdateData({})
        value && getList()
    }

    const onDelete = async (item) => {
       await removeCate([item.id])
       getList()
    }

    const onUpdate = (item) => {
        setTypeMode('update')
        setUpdateData(item)
        setModel(true)
    }

    return (<>
        <Card
        >
            <DForm submit={findForm} onAdd= {onAdd  } />
        </Card>

        <Card
            style={{
                marginTop: 20,
            }}
        >
            <Table list={list} loading={loading}  onDelete={ onDelete } onUpdate=  {onUpdate}  />
        </Card>

        <Mode title={typeMode === 'add' ? '新增': '更新'} show= { showModel } change={ changeMode } list={list} type={ typeMode } updateData={updateData}></Mode>
    </>)
};
export default App;