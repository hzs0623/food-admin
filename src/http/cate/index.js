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

export const removeCate = (ids=[]) => {
    return $http({
        url: '/category/delete',
        method: 'get',
        params: {
            ids
        }
    })
}

export const updateCate = ({ categoryImg, categoryName, id,  parentId,  status, wcategoryName }) => {
    return $http({
        url: '/category/update',
        method: 'post',
        data: {
            categoryImg, categoryName, id,  parentId,  status, wcategoryName
        }
    })
}