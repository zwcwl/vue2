let env=process.env.NODE_ENV || "production"

let envConfig={
	production:{
		baseApi:"",
		mockApi:""
	},
	development:{
		baseApi:"/api",
		mockApi:"https://www.fastmock.site/mock/1eff10f261bcc283c37ced50e5d0a49f/api"
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