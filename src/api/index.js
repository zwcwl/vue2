import request from "@/utils/request"

//登入
function login(params={}){
	return request.post("/users/login",params)
}

//获取菜单项
function noticeCount(params={}){
	return request.get("/leave/count",params)
}

//获取菜单列表
function getMenuList(params={}){
	return request.get("/menu/list",params)
}

//获取用户列表
function getUserList(params={}){
	return request.get("/users/list",params)
}

export default {
	login,
	noticeCount,
	getMenuList,
	getUserList
}