function titleCase(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

export const getFormConfig = (configs = []) => {
    const formConfigs = configs.reduce((arr, item) => {
        if (item.name) {
            item.comp = titleCase(item.comp)
            if (item.rules && !Array.isArray(item.rules)) {
                item.rules = [{ required: true, message: `Please ${item.name}!`, },]
            }
            arr.push(item)
        }
        return arr
    }, [])

    return { formConfigs }
}