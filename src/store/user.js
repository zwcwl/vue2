import storage from "@/utils/storage"

let state = function () {
    return {
        userInfo: {}
    }
}
let mutations = {
    addUserInfo(state, val) {
        state.userInfo = val
        storage.setItem("userInfo", val)
    },
    delUserInfo(state) {
        state.userInfo = []
        storage.delItem("userInfo")
    }
}

export default {
    state,
    mutations,
}