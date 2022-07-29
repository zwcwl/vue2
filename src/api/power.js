import request from "@/utils/request"

export default {
	getPower (params) {
		return request.get("/power", params)
	},
	postPower (params) {
		return request.post("/power", params, { mock: false })
	},
	delPower (params) {
		return request.delete("/power", params, { mock: false })
	},
	putPower (params) {
		return request.put("/power", params, { mock: false })
	}
}