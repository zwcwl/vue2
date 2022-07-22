import Vue from "vue"
import Vuex from "vuex"

import storage from "@/utils/storage"

Vue.use(Vuex)

let state={
	userInfo:[]
}

let mutations={
	addUserInfo(state,val){
		state.userInfo=val
		storage.replaceItem("TOKEN",val)
	},
	delUserInfo(state){
		state.userInfo=[]
		storage.removeKey("TOKEN")
	}
}

let store = new Vuex.Store({
	state,
	mutations
})

export default store