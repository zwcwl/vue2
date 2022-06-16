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

//每次路由跳转时，都进行验证token是否正确
let auth = {
	async loggedIn() {
		try {
			//获取本地token
			let val = localStorage.getItem("TOKEN")
			//服务器验证token
			let result = await Vue.prototype.$api.ferify()
			return Promise.resolve(val && result)
		} catch (error) {
			console.log(error);
		}
	}
}

//全局路由守卫
router.beforeEach(async (to, from, next) => {
	if (to.matched.some(record => record.meta.requestAuth)) {
		let result = await auth.loggedIn()
		if (!result) {
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

//配置路由重复跳转报错问题
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.push = function push(location) {
	return originalReplace.call(this, location).catch(err => err)
}

export default router