import Vue from "vue";
import VueRouter from "vue-router"

// import $api from "@/api"

Vue.use(VueRouter)

let routes = [
	{
		path: "/",
		meta: {
			requestAuth: true,
			name: "首页",
		},
		component: () => import("@/views/home/HomeView"),
		children: [
			{
				path: "",
				name: "HelloView",
				meta: {
					requestAuth: true,
					name: "欢迎"
				},
				component: () => import("@/views/hello/HelloView")
			},
			{
				path: "setting",
				name: "SettingView",
				meta: {
					requestAuth: true,
					name: "设置"
				},
				component: () => import("@/views/main/SettingView")
			}
		]
	},
	{
		path: "/login",
		name: "LoginView",
		component: () => import("@/views/login/LoginView")
	},
	{
		path: "*",
		name: "NotView",
		component: () => import("@/views/404/NotView")
	}
]

let router = new VueRouter({
	routes,
	mode: "history"
})

//判断token是否存在
let auth = {
	async loggedIn () {
		let val = localStorage.getItem("TOKEN")
		let result = await Vue.prototype.$api.ferify()
		return val && result
	}
}

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requestAuth)) {

		if (!auth.loggedIn()) {
			next({
				path: '/login',
				replace: true
			})
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router