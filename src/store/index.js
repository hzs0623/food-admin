const { createStore } = require("redux")

const initialState = {
    cateList: [],
}


function reducer(state = initialState, action) {
    if (action.type === "setCateList") { // 更新cate列表
        return { ...state, cateList: action.list }
    }
    
    return state
}


// 创建的store, 内部会自动回调reducer, 拿到initialState
const store = createStore(reducer)

export default store
