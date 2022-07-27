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
		storage.setItem("userInfo",val)
	},
	delUserInfo(state){
		state.userInfo=[]
		storage.delItem("userInfo")
	}
}

let store = new Vuex.Store({
	state,
	mutations
})

export default store