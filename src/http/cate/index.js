export const getCateList = ({ pageNum = 10, pageSize = 1, parentId, storeId } = {}) => {
    return $http({
        url: '/category/list',
        method: 'post',
        data: {
            pageNum, pageSize, parentId, storeId
        }
    })
}

export const addCate = ({ categoryName, wcategoryName,  parentId, storeId, type, categoryImg = '' }) => {
    return $http({
        url: '/category/add',
        method: 'post',
        data: {
            categoryName,
            wcategoryName,
            parentId, storeId, type,
            categoryImg
        }
    })
}