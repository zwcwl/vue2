import request from "@/utils/request"
import user from "./user"
import menu from "./menu"
import role from "./role"
import dept from "./dept"



//获取待办项数量
function getUndone (params = {}) {
	return request.get("/undone", params, { mock: true })
}

//更新权限
function putPermission(params=[]){
	return request.put(
		"/role/permission",
		params,
		{mock:true}
	)
}




export default {
	...user,
	...menu,
	...role,
	...dept,
	getUndone,
	putPermission
}