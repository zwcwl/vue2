import storage from "@/utils/storage"

let state = function () {
    return {
        powerList: []
    }
}
let mutations = {
    addPower(state, val) {
        state.userInfo = val
        storage.setItem("powerList", val)
    },
    delPower(state) {
        state.userInfo = []
        storage.delItem("powerList")
    }
}

export default {
    state,
    mutations,
}