export const addStoreAPi = (data) => {
    return $http({
        url: '/store/add',
        method: 'post',
        data
    })
    
}