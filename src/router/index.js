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
			name: "首页",
			title:"vue2"
		},
		component: () => import("@/views/HomeView"),
		children: [
			//欢迎页面
			{
				path: "",
				name: "HelloView",
				meta: {
					requestAuth: true,
					name: "欢迎",
					title:"vue2"
				},
				component: () => import("@/views/hello/HelloView")
			},

			//系统管理
			//用户管理页面
			{
				path: "system/user",
				name: "ManageView",
				meta: {
					requestAuth: true,
					name: "用户管理"
				},
				component: () => import("@/views/userManage/UserManage")
			},

			//菜单管理页面
			{
				path: "system/menu",
				name: "MenuManage",
				meta: {
					requestAuth: true,
					name: "菜单管理"
				},
				component: () => import("@/views/menuManage/MenuManage")
			},

			//角色管理页面
			{
				path: "system/role",
				name: "RoleManage",
				meta: {
					requestAuth: true,
					name: "角色管理"
				},
				component: () => import("@/views/roleManage/RoleManage")
			},

			//登入页面
			{
				path: "/user/login",
				name: "LoginView",
				meta: {
					name: "登入",
				},
				component: () => import("@/views/login/LoginView")
			},

			//未匹配的路由显示的页面
			{
				path: "*",
				name: "NotView",
				meta: {
					name: "首页",
				},
				component: () => import("@/views/404/NotView")
			}
		]
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