import config from "@/config"
import axios from "axios"
import storage from "@/utils/storage"

console.log(config);
//创建axios实例
let instance = axios.create({
	baseURL: config.baseApi,
	timeout: 8000
})

//请求拦截
instance.interceptors.request.use(
	config => {
		let result=storage.getItem("TOKEN","token")
		if(result){
			config.headers.authorization=result
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
		console.log(response);
		let {code,data,msg} = response.data
		if(code>=200 && code < 300){
			return data
		}else if(code <= 300){
			return Promise.reject(msg)
		}
	},
	error=>{
		console.log(54);
		return Promise.reject(error)
	}
)

//封装请求
function request(options){

	//判断moke是否打开，打开了使用mock地址
	options.baseURL=config.mock?config.mockApi:config.baseApi

	//当请求为get时，则把data转换为params
	if(options.method === "get"){
		options.params=options.data
		delete options.data
	}

	//触发请求，返回请求promise
	return instance(options)
}

//封装请求的方法
["get","post","put","delete"].forEach(item=>{
	request[item]=function(url,options){
		return request({
			method:item,
			url,
			data:options
		})
	}
})

export default request