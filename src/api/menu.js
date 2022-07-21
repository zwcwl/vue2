import request from "@/utils/request"

export default {
    //获取菜单项
    getMenu(params = {}) {
        return request.get("/menu", params, { mock: false })
    },

    //新增菜单
    postMenu(params = []) {
        return request.post("/menu", params, { mock: false })
    },

    //编辑菜单
    putMenu(params = []) {
        return request.put("/menu", params, { mock: false })
    },

    //删除菜单
    delMenu(params = []) {
        return request.delete("/menu", params, { mock: false })
    }
}