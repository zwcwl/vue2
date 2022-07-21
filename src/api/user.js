import request from "@/utils/request"

export default {
    //登入
    userLogin(params = {}) {
        return request.post("/users/login", params)
    },

    //获取用户
    getUser(params = {}) {
        return request.get("/users", params)
    },

    //新增用户
    postUser(params = {}) {
        return request.post("/users", params)
    },

    //更新用户
    putUser(params = {}) {
        return request.put("/users", params)
    },

    //删除用户
    delUser(params = {}) {
        return request.delete("/users", params)
    },

    etUserAll(params = []) {
        return request.get(
            "/user/all",
            params,
            { mock: true }
        )
    }
}