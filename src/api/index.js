import request from "@/utils/request"

function login(options){
	options.method="post"
	options.url="/login"
	return request(options)
}

function test(options){
	options.method="get"
	options.url="/test"
	return request(options)
}

export default {
	login,
	test
}