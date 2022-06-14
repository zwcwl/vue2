import Vue from "vue";
import VueRouter from "vue-router"


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
	},
	{
		path:"*",
		component:()=>import("@/views/404/NotView")
	}
]

let router = new VueRouter({
	routes,
	mode:"history"
})

let auth={
	loggedIn(){
		let val=localStorage.getItem("TOKEN")
		return val
	}
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requestAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
	console.log(auth.loggedIn());
    if (!auth.loggedIn()) {
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