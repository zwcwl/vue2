import config from "@/config"
import axios from "axios"
import storage from "@/utils/storage"

// const CODE = {
// 	SUCCESS: 200,  //成功
// 	PARAM_ERROR: "参数错误",
// 	USER_ACCOUNT_ERROR: "账号或密码错误",
// 	USER_LOGIN_ERROR: 30001,   //用户未登入
// 	BUSINESS_ERROR: 40001,   //业务请求失败
// 	AUTH_ERROR: "认证失败或TOKEN过期",
// 	NETWORK_ERROR: "网络请求异常，请稍后重试"
// };

//创建axios实例
let instance = axios.create({
	baseURL: config.baseApi,
	timeout: 8000
})

//请求拦截
instance.interceptors.request.use(
	config => {
		//将token设置到请求头
		let result = storage.getItem("TOKEN", "token")
		if (result) {
			config.headers.authorization = result
		}
		return config;
	},
	error => {
		return Promise.reject(error)
	}
)

//响应拦截
instance.interceptors.response.use(
	//响应成功的数据
	response => {
		let { code, msg , data } = response.data

		//判断当状态为200时表示响应成功
		if (code === 200) {
			return Promise.resolve(data)
		} else {
				//账号密码错误
			if (code === 30001) {
				return Promise.reject(msg)

				//token认证失败或过期
			} else if (code === 30002) {
				return Promise.reject(msg)

				//参数错误
			} else if (code === 30003) {
				return Promise.reject(msg)

				//网络异常，请重新登入
			}else if(code === 30004){
				return Promise.reject(msg)

				//您还未登入，请登入后查看
			}else if(code === 30005){
				return Promise.reject(msg)
			}
		}
	},
	//响应失败的错误信息
	error => {
		return Promise.reject(error)
	}
)

//封装请求
function request (options) {

	//判断moke是否打开，打开了使用mock地址
	options.baseURL = config.mock ? config.mockApi : config.baseApi

	//当请求为get时，则把data转换为params
	if (options.method === "get") {
		options.params = options.data
		delete options.data
	}

	//触发请求，返回请求promise
	return instance(options)
}

//封装请求的方法
["get", "post", "put", "delete"].forEach(item => {
	request[item] = function (url, options) {
		return request({
			method: item,
			url,
			data: options
		})
	}
})

export default request