import Vue from "vue";
import VueRouter from "vue-router"

import storage from "@/utils/storage"

Vue.use(VueRouter)

let routes=[
	{
		path:"",
		meta:{
			requestAuth:true
		},
		component:()=>import("@/views/home/HomeView"),
		children:[
			{
				path:"",
				component:()=>import("@/views/hello/HelloView")
			}
		]
	},
	{
		path:"/login",
		component:()=>import("@/views/login/LoginView")
	}
]

let router = new VueRouter({
	routes,
	mode:"history"
})

let auth={
	loggedIn(){
		let val=storage.getAll("TOKEN")
		console.log(JSON.stringify(val) === "[]");
		return storage.getAll("TOKEN")
	}
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requestAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (auth.loggedIn()) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router