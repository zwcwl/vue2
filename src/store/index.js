import Vue from "vue"
import Vuex from "vuex"

import menu from "./menu"
import user from "./user"

Vue.use(Vuex)

let store = new Vuex.Store({
	modules:{
		user,
		menu
	}
})

export default store