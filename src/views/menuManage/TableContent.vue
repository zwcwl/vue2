<template>
	<div id="table-content">
		<div class="action">
			<el-button type="primary" @click="dialogShow('create')">新增</el-button>
		</div>

		<el-table ref="multipleTable" :data="menuList" tooltip-effect="dark" style="width: 100%" stripe border row-key="_id">

			<el-table-column v-for="item in columns" :key="item.prop" :label="item.label" :prop="item.prop"
				:formatter="item.formatter" :width="item.width">
			</el-table-column>

			<el-table-column label="操作" width="220px">
				<template slot-scope="scope">
					<el-button size="mini" @click="dialogShow('update', scope.row)">新增</el-button>
					<el-button size="mini" @click="dialogShow('update', scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
				</template>
			</el-table-column>

		</el-table>
	</div>
</template>

<script>
import dateFormat from "@/utils/dateFormat"
export default {
	name: "TableContent",
	data () {
		return {
			menuList: [],
			actions: "",
			columns: [
				{
					label: "菜单名称",
					prop: "menuName",
					width: "160px"
				},
				{
					label: "图标",
					prop: "icon",
					width: "80px"
				},
				{
					label: "菜单类型",
					prop: "menuType",
					width: "180px",
					formatter (row, column, value) {
						return {
							1: "菜单",
							2: "按钮"
						}[value]
					}
				},
				{
					label: "权限标识",
					prop: "menuCode",
					width: "80px",
				},
				{
					label: "路由地址",
					prop: "path",
					width: "80px"
				},
				{
					label: "组件路径",
					prop: "component",
					width: "80px"
				},
				{
					label: "菜单状态",
					prop: "menuState",
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
				}
			]
		}
	},
	methods: {
		//点击删除按钮，删除单个表格
		async handleDel (row) {
			try {
				await this.$api.delUser({ userIds: [row.userId] })
				this.$bus.$emit("onSubmit")
				this.$message.success("删除成功");
			} catch (error) {
				this.$message.success("删除失败");
			}
		},

		//获取用户列表函数
		async getMenu (queryForm = []) {
			try {
				let res = await this.$api.getMenu(queryForm)
				this.menuList = res
			} catch (error) {
				console.log(error)
			}
		},

		//点击显示添加表单
		dialogShow (action, row) {
			this.$bus.$emit("dialogShow", { action, ...row })
		}
	},
	created () {
		this.$bus.$on("getMenu", this.getMenu)
	}
}
</script>

<style lang="scss">
#table-content {
	margin-top: 20px;
	padding: 20px;
	background-color: #fff;

	.action {
		margin-bottom: 20px;
	}

	.el-pagination {
		margin-top: 20px;
		text-align: right;
	}
}
</style>