export const getAreaCode = async (parentId = -1) => {
    const res = await $http({
        url: '/region/area',
        method: 'get',
        params: { parentId } // -1查询所有省
    })
    const { data = [] } = res || {}

    return data.map(item => {
        return {
            ...item,
            value: item.areaCode,
            label: item.areaName
        }
    })
}
