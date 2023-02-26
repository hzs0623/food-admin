import { Card } from 'antd';
import Table from './table'
import DForm from './From'
import { useState } from 'react'

import { getCateList } from '../../http/cate'

const App = () => {
    const [total, setTotal] = useState(0)
    const [pageSize, setpageSize] = useState(1)
    const [pageNum, setpageNum] = useState(10)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])

    const getList = async ({ parentId = '', storeId = '' }) => {
        setpageSize(1)
        setpageNum(10)
        setLoading(true)

        try {
            const res = await getCateList({
                pageSize,
                pageNum,
                storeId,
                parentId
            })
            const { records, total } = res.data || {}
            setList(records)
            setTotal(total)
        } finally {
            setLoading(false)
        }
    }

    return (<>
        <Card
        >
            <DForm submit={ getList } />
        </Card>

        <Card
            style={{
                marginTop: 20,
            }}
        >
            <Table  list={ list } loading={ loading } />
        </Card>
    </>)
};
export default App;