export const getSwipreList = ({ type }) => {
    return $http({
        url: '/slideshow/list',
        method: 'post',
        data: {
            type
        }
    })
}

export const addSwipreApi = (data) => {
    return $http({
        url: '/slideshow/add',
        method: 'post',
        data
    })   
}

export const deleteSwipre = (ids = []) => {
    return $http({
        url: '/slideshow/delete',
        method: 'post',
        data: {
            ids
        }
    })   
}

