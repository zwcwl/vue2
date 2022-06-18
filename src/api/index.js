import request from "@/utils/request"

function login(options={}){
	return request.post("/user/login",options)
}

function test(options={}){
	return request.get("/test",options)
}

function leave(options={}){
	return request.get("/leave/count",options)
}

export default {
	login,
	test,
	leave
}