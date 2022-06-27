import request from "@/utils/request"

//登入
function usersLogin(params = {}) {
	return request.post("/users/login",params, {mock:false})
}

//获取待办项数量
function getUndone(params = {}) {
	return request.get("/undone", params)
}

//获取菜单项
function getMenu(params = {}) {
	return request.get("/menu", params)
}

//获取用户
function getUser(params = {}) {
	return request.get("/users", params)
}

//新增用户
function postUser(params={}){
	return request.post("/users",params)
}

//更新用户
function putUser(params={}){
	return request.put("/users",params)
}

//删除用户
function delUser(params = {}) {
	return request.post("/users", params)
}

//获取角色
function getRole(params={}){
	return request.get("/roles",params)
}

//获取部门
function getDept(params={}){
	return request.get("/dept",params)
}

export default {
	usersLogin,
	getUndone,
	getMenu,
	getUser,
	delUser,
	getRole,
	getDept,
	postUser,
	putUser
}