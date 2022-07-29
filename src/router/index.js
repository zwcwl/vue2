import Vue from "vue";
import VueRouter from "vue-router"
import storage from "@/utils/storage"

// import $api from "@/api"

Vue.use(VueRouter)

let routes = [
	//首页
	{
		path: "/",
		meta: {
			pathName: "首页",
			title: "vue2"
		},
		component: () => import("@/views/home/Home"),
		children: [
			//欢迎页面
			{
				path: "",
				name: "Welcome",
				meta: {
					requestAuth: true,
					pathName: "欢迎",
					title: "vue2"
				},
				component: () => import("@/views/main/welcome/Welcome")
			},

			//系统管理
			//用户管理页面
			{
				path: "system/user",
				name: "User",
				meta: {
					requestAuth: true,
					pathName: "用户"
				},
				component: () => import("@/views/main/user/User")
			},

			//菜单管理页面
			{
				path: "system/menu",
				name: "Menu",
				meta: {
					requestAuth: true,
					pathName: "菜单"
				},
				component: () => import("@/views/main/menu/Menu")
			},

			//角色管理页面
			{
				path: "system/role",
				name: "Role",
				meta: {
					requestAuth: true,
					pathName: "角色"
				},
				component: () => import("@/views/main/role/Role")
			},

			//部门管理页面
			{
				path: "system/dept",
				name: "Dept",
				meta: {
					requestAuth: true,
					pathName: "部门"
				},
				component: () => import("@/views/main/dept/Dept")
			},

			//权限管理页面
			{
				path: "system/power",
				name: "Power",
				meta: {
					requestAuth: true,
					pathName: "权限"
				},
				component: () => import("@/views/main/power/Power")
			}
		]
	},

	//登入页面
	{
		path: "/user/login",
		name: "LoginView",
		meta: {
			pathName: "登入",
		},
		component: () => import("@/views/login/Login")
	},

	//未匹配的路由显示的页面
	{
		path: "*",
		name: "404",
		meta: {
			pathName: "首页",
		},
		component: () => import("@/views/404/404")
	}
]

let router = new VueRouter({
	routes,
	mode: "history"
})

//每次路由跳转时，都进行验证token是否正确
let auth = {
	token () {
		return JSON.stringify(storage.getAll("userInfo")) === "{}"
	}
}

//全局路由守卫
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requestAuth)) {
		if (auth.token()) {
			next({ path: '/user/login' }, { replace: true })
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