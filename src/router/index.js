import Vue from "vue";
import VueRouter from "vue-router"
import storage from "@/utils/storage"

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
			},
			{
				path:"manage",
				name:"ManageView",
				meta:{
					requestAuth: true,
					name: "用户管理"
				},
				component:()=>import("@/views/main/ManageView")
			}
		]
	},
	{
		path: "/user/login",
		name: "LoginView",
		meta: {
			name: "登入",
		},
		component: () => import("@/views/login/LoginView")
	},
	{
		path: "*",
		name: "NotView",
		meta: {
			name: "首页",
		},
		component: () => import("@/views/404/NotView")
	}
]

let router = new VueRouter({
	routes,
	mode: "history"
})

//每次路由跳转时，都进行验证token是否正确
let auth = {
	token () {
		return JSON.stringify(storage.getAll("TOKEN")) === "{}"
	}
}

//全局路由守卫
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requestAuth)) {
		if (auth.token()) {
			next({path: '/user/login'},{replace: true})
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
VueRouter.prototype.push = function push (location) {
	return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace (location) {
	return originalReplace.call(this, location).catch(err => err)
}

export default router