import config from "@/config"
import axios from "axios"
import storage from "@/utils/storage"
import { Message } from "element-ui"

import vueRouter from "vue-router"

// const CODE = {
// 	SUCCESS: 200,  //成功
// 	PARAM_ERROR: "参数错误",
// 	USER_ACCOUNT_ERROR: "账号或密码错误",
// 	USER_LOGIN_ERROR: 30001,   //用户未登入
// 	BUSINESS_ERROR: 40001,   //业务请求失败
// 	AUTH_ERROR: "认证失败或TOKEN过期",
// 	NETWORK_ERROR: "网络请求异常，请稍后重试"
// };

let CODE = {
	SUCCESS: 200,
	PARAM_ERROR: 10001,						//参数错误
	USER_ACCOUNT_ERROR: 20001,		//账号或密码错误
	USER_LOGIN_ERROR: 30001,			//用户未登入
	BUSINESS_ERROR: 40001,				//业务请求失败
	AUTH_ERROR: 50001,						//TOKEN认证失败或过期
	NETWORK_ERROR: 60001					//"网络请求异常，请稍后重试"
}

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
		let { code, msg, data } = response.data
		console.log("🚀 ~ file: request.js ~ line 41 ~ data", data)
		//判断当状态为200时表示响应成功
		if (code === CODE.SUCCESS) {
			return Promise.resolve(data)
		} else {
			//参数错误
			if (code === CODE.PARAM_ERROR) {
				Message.error("参数错误")

				//账号密码错误
			} else if (code === CODE.USER_ACCOUNT_ERROR) {
				Message.error("账号或密码错误，请重新输入")

				//用户未登入
			} else if (code === CODE.USER_LOGIN_ERROR) {
				Message.error("您还未登入，请登入后查看")
				vueRouter.replace("/user/login")

				//业务请求失败
			} else if (code === BUSINESS_ERROR) {
				Message.error("业务请求失败")

				//TOKEN认证失败或过期,请重新登入
			} else if (code === AUTH_ERROR) {
				Message.error("TOKEN认证失败或过期,请重新登入")

				//网络请求异常，请稍后重试
			}else if (code === NETWORK_ERROR) {
				Message.error("网络请求异常，请稍后重试")
			}

			//返回错误信息
			return Promise.reject(msg)
		}
	},
	//响应失败的错误信息
	error => {
		return Promise.reject(error)
	}
)

//封装请求
function request (options) {

	//判断局部mock
	let isMock = config.mock
	if (options.mock != undefined) {
		isMock = options.mock
	}

	//判断moke是否打开
	if (config.env === "production") {
		options.baseURL = config.baseApi
	} else {
		options.baseURL = isMock ? config.mockApi : config.baseApi
	}

	//当请求为get时，则把data转换为options
	options.method = options.method || "get"
	if (options.method === "get") {
		options.params = options.data
		delete options.data
	}

	//触发请求，返回请求promise
	return instance(options)
}

//封装请求的方法
["get", "post", "put", "delete"].forEach(item => {
	request[item] = function (url, data, options) {
		return request({
			method: item,
			url,
			data,
			...options
		})
	}
})

export default request