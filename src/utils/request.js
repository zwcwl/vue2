import config from "@/config"
import axios from "axios"

console.log(config);
//创建axios实例
let instance = axios.create({
	baseURL: config.baseApi,
	timeout: 8000
})

//请求拦截
instance.interceptors.request.use(
	config => {
		let result=localStorage.getItem("TOKEN")
		console.log(result)
		if(result){
			config.headers.Authorization=result
		}
		return config;
	},
	error=>{
		return Promise.reject(error)
	}
)

//响应拦截
instance.interceptors.response.use(
	response=>{
		return response.data
	},
	error=>{
		return Promise.reject(error)
	}
)

//封装请求
function request(options){

	//判断moke是否打开，打开了使用mock地址
	options.baseURL=config.mock?config.mockApi:config.baseApi
	return instance(options)
}

export default request