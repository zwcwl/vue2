import request from "@/utils/request"

export default {
    //获取部门
    getDept(params = {}) {
        return request.get("/dept", params, { mock: true })
    },

    //添加部门
    postDept(params = []) {
        return request.post(
            "/dept",
            params,
            { mock: true }
        )
    },

    //更新部门
    putDept(params = []) {
        return request.put(
            "/dept",
            params,
            { mock: true }
        )
    },

    //删除部门
    delDept(params = []) {
        return request.delete(
            "/dept",
            params,
            { mock: true }
        )
    }
}