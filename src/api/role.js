module.exports = {
    //获取角色，用来显示角色列表
    getRole(params = []) {
        return request.get(
            "/role",
            params,
            { mock: true }
        )
    },

    //新增角色
    postRole(params = []) {
        return request.post(
            "/role",
            params,
            { mock: false }
        )
    },

    //删除角色
    deleteRole(params = []) {
        return request.delete(
            "/role",
            params,
            { mock: false }
        )
    },

    //编辑角色
    putRole(params = []) {
        return request.put(
            "/role",
            params,
            { mock: false })
    },

    //获取角色用于创建用户
    getRoleGain(params = {}) {
        return request.get("/role/gain", params, { mock: true })
    }
}