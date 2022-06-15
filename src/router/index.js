import Vue from "vue";
import VueRouter from "vue-router"


Vue.use(VueRouter)

let routes = [
	{
		path: "",
		meta: {
			requestAuth: true
		},
		component: () => import("@/views/home/HomeView"),
		children: [
			{
				path: "",
				component: () => import("@/views/hello/HelloView")
			}
		]
	},
	{
		path: "/login",
		component: () => import("@/views/login/LoginView")
	},
	{
		path: "*",
		component: () => import("@/views/404/NotView")
	}
]

let router = new VueRouter({
	routes,
	mode: "history"
})

//判断token是否存在
let auth = {
	loggedIn () {
		let val = localStorage.getItem("TOKEN")
		return val
	}
}

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requestAuth)) {

		if (!auth.loggedIn()) {
			next({
				path: '/login'
			})
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router