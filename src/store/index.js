import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

let state={
	isSpread:false
}

let mutations={
	cutSpread(state){
		state.isSpread=!state.isSpread
	}
}

let store = new Vuex.Store({
	state,
	mutations
})

export default store