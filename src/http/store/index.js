export const getStoreListAPi = (data) => {
    return $http({
        url: '/store/list',
        method: 'post',
        data
    })
    
}

export const updateStoreAPi = (data) => {
    return $http({
        url: '/store/update',
        method: 'post',
        data
    })
    
}

export const addStoreAPi = (data) => {
    return $http({
        url: '/store/add',
        method: 'post',
        data
    })
    
}