import request from "@/utils/request"

//登入
function usersLogin (params = {}) {
	return request.post("/users/login", params)
}

//获取待办项数量
function getUndone (params = {}) {
	return request.get("/undone", params, { mock: true })
}

//获取菜单项
function getMenu (params = {}) {
	return request.get("/menu", params, { mock: false })
}

//获取用户
function getUser (params = {}) {
	return request.get("/users", params)
}

//新增用户
function postUser (params = {}) {
	return request.post("/users", params)
}

//更新用户
function putUser (params = {}) {
	return request.put("/users", params)
}

//删除用户
function delUser (params = {}) {
	return request.delete("/users", params)
}

//获取角色用于创建用户
function getRoleGain (params = {}) {
	return request.get("/role/gain", params, { mock: true })
}

//获取部门
function getDept (params = {}) {
	return request.get("/dept", params, { mock: true })
}

//新增菜单
function postMenu (params = []) {
	return request.post("/menu", params, { mock: false })
}

//编辑菜单
function putMenu (params = []) {
	return request.put("/menu", params, { mock: false })
}

//删除菜单
function delMenu (params = []) {
	return request.delete("/menu", params, { mock: false })
}

//获取角色，用来显示角色列表
function getRole (params = []) {
	return request.get(
		"/role",
		params,
		{ mock: true }
	)
}

//新增角色
function postRole (params = []) {
	return request.post(
		"/role",
		params,
		{ mock: false }
	)
}

//删除角色
function deleteRole (params = []) {
	return request.delete(
		"/role",
		params,
		{ mock: false }
	)
}

//编辑角色
function putRole (params = []) {
	return request.put(
		"/role",
		params,
		{ mock: false })
}

export default {
	usersLogin,
	getUndone,
	getMenu,
	getUser,
	delUser,
	getRoleGain,
	getDept,
	postUser,
	putUser,
	postMenu,
	putMenu,
	delMenu,
	getRole,
	postRole,
	deleteRole,
	putRole
}