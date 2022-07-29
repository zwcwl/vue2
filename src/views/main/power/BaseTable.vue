<template>
	<div id="base-table">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<el-button type="primary" @click="powerOpenDialog('create')">新增</el-button>
			</div>
			<div class="table">
				<el-table :data="powerList" tooltip-effect="dark" style="width: 100%" stripe border>

					<el-table-column v-for="item in columns" :key="item.prop" :label="item.label" :prop="item.prop"
						:formatter="item.formatter" :width="item.width">
					</el-table-column>

					<el-table-column label="操作" width="220px">
						<template slot-scope="scope">
							<el-button size="mini" type="info" @click="powerOpenDialog('update', scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDel(scope.row._id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
	</div>
</template>

<script>
import dateFormat from "@/utils/dateFormat"
export default {
	name: "BaseTable",
	data () {
		return {
			columns: [
				{
					label: "权限名称",
					prop: "powerName",
					width: "160px"
				},
				{
					label: "权限状态",
					prop: "powerState",
					width: "80px",
					formatter (row, column, value) {
						return {
							1: "正常",
							2: "停用"
						}[value]
					}
				},
				{
					label: "注册时间",
					prop: "createTime",
					formatter (row, column, value) {
						return dateFormat(value)
					}
				},
				{
					label: "更新时间",
					prop: "updateTime",
					formatter (row, column, value) {
						return dateFormat(value)
					}
				}

			],
			powerList: [],
		}
	},
	methods: {
		//点击删除按钮，删除单个表格
		async handleDel (id) {
			try {
				await this.$api.delPower(id)
				this.$bus.$emit("querySubmit")
				this.$message.success("删除成功");
			} catch (error) {
				this.$message.success("删除失败");
			}
		},

		//获取用户列表函数
		async getPower (queryForm) {
			let res = await this.$api.getPower(queryForm)
			this.powerList = res
		},

		//点击显示添加表单
		powerOpenDialog (dialogType, row) {
			this.$bus.$emit("powerOpenDialog", dialogType, row)
		}
	},
	created () {
		this.$bus.$on("getPower", this.getPower)
	}
}
</script>

<style lang="scss">
#base-table {
	margin-top: 20px;

}
</style>