import Vue from "vue"
import Vuex from "vuex"

import menu from "./menu"
import user from "./user"
import power from "./power"

Vue.use(Vuex)

let store = new Vuex.Store({
	modules:{
		user,
		menu,
		power
	}
})

export default store