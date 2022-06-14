import request from "@/utils/request"

function login(options){
	options.method="post"
	options.url="/login"
	return request(options)
}

export default {
	login
}