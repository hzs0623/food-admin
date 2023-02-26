export const getCateList = ({ pageNum, pageSize, parentId, storeId  }) => {
    return $http({
        url: '/category/list',
        method: 'post',
        data: {
            pageNum, pageSize, parentId, storeId 
        }
    })
}