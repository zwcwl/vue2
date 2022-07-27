import storage from "@/utils/storage"

let state=function (){
    return {
        menuList:{}
    }
}

let mutations={
    addMenu(state, val) {
        state.menuList = val
        storage.setItem("menuList", val)
    },
    delMenu(state) {
        state.userInfo = {}
        storage.delItem("menuList")
    }
}


export default {
    state,
    mutations,
}