import request from "@/utils/request"

//登入
function usersLogin(params = {}) {
	return request.post("/users/login",params)
}

//获取待办项数量
function getUndone(params = {}) {
	return request.get("/undone", params, {mock:true})
}

//获取菜单项
function getMenu(params = {}) {
	return request.get("/menu", params, {mock:true})
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
	return request.delete("/users", params)
}

//获取角色
function getRole(params={}){
	return request.get("/role",params, {mock:true})
}

//获取部门
function getDept(params={}){
	return request.get("/dept",params, {mock:true})
}

//新增菜单
function postMenu(params=[]){
	return request.post("/menu",params,{mock:false})
}

//编辑菜单
function putMenu(params=[]){
	return request.put("/menu",params,{mock:false})
}

//删除菜单
function delMenu(params=[]){
	return request.delete("/menu",params,{mock:true})
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
	putUser,
	postMenu,
	putMenu,
	delMenu
}