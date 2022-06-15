import request from "@/utils/request"

function login(options){
	return request.post("/login",options)
}

function test(options){
	return request.get("/test",options)
}

export default {
	login,
	test
}