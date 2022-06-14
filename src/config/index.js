let env=process.env.NODE_ENV || "production"

let envConfig={
	production:{
		baseApi:"",
		mockApi:""
	},
	development:{
		baseApi:"/api",
		mockApi:"http://127.0.0.1:4523/m1/410799-0-default/api"
	},
	test:{
		baseApi:"",
		mockApi:""
	}
}

export default {
	env,
	mock:false,
	...envConfig[env]
}