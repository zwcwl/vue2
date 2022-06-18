import Vue from "vue"
import Vuex from "vuex"

import storage from "@/utils/storage"

Vue.use(Vuex)

let state={
	isSpread:false,
	userinfo:[]
}

let mutations={
	cutSpread(state){
		state.isSpread=!state.isSpread
	},
	addUserInfo(state,val){
		state.userinfo=val
		storage.replaceItem("TOKEN",val)
	},
	delUserInfo(state){
		state.userinfo=[]
		storage.removeKey("TOKEN")
	}
}

let store = new Vuex.Store({
	state,
	mutations
})

export default store