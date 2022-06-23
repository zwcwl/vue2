import request from "@/utils/request"

//登入
function login(params = {}) {
	return request.post("/users/login", params)
}

//获取菜单项
function noticeCount(params = {}) {
	return request.get("/leave/count", params)
}

//获取菜单列表
function getMenuList(params = {}) {
	return request.get("/menu/list", params)
}

//获取用户列表
function getUserList(params = {}) {
	return request.get("/users/list", params)
}

//删除用户
function userDel(params = {}) {
	return request.post("/users/delete", params)
}

//获取
function getRoleList(params={}){
	return request.get("/roles/list",params)
}

function getDeptList(params={}){
	return request.get("/dept/list",params)
}

export default {
	login,
	noticeCount,
	getMenuList,
	getUserList,
	userDel,
	getRoleList,
	getDeptList
}