<template>
	<div id="base-table">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<el-button type="primary" @click="menuOpenDialog">新增</el-button>
			</div>
			<div class="table">
				<el-table ref="multipleTable" :data="menuList" tooltip-effect="dark" style="width: 100%" stripe border
					row-key="_id">

					<el-table-column v-for="item in columns" :key="item.prop" :label="item.label" :prop="item.prop"
						:formatter="item.formatter" :width="item.width">
					</el-table-column>

					<el-table-column label="操作" width="220px">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="menuOpenDialog('create', scope.row)" v-if="scope.row.menuType !== 3">新增</el-button>
							<el-button size="mini" type="info" @click="menuOpenDialog('update', scope.row)">编辑</el-button>
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
					label: "菜单名称",
					prop: "menuName",
					width: "160px"
				},
				{
					label: "图标",
					prop: "icon",
					width: "180px"
				},
				{
					label: "菜单类型",
					prop: "menudialogType",
					width: "80px",
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
					width: "180px"
				},
				{
					label: "组件路径",
					prop: "component",
					width: "180px"
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
			],
			menuList: []
		}
	},
	methods: {
		//点击删除按钮，删除单个表格
		async handleDel (id) {
			try {
				console.log(id);
				await this.$api.delMenu(id)
				this.$bus.$emit("querySubmit")
				this.$message.success("删除成功");
			} catch (error) {
				this.$message.success("删除失败");
			}
		},

		//获取用户列表函数
		async getMenu (queryForm) {
			let res = await this.$api.getMenu(queryForm)
			this.menuList = res
		},

		//点击显示添加表单
		menuOpenDialog (dialogType, row) {
			this.$bus.$emit("menuOpenDialog", dialogType, row)
		}
	},
	created () {
		this.$bus.$on("getMenu", this.getMenu)
	}
}
</script>

<style lang="scss">
#base-table {
	margin-top: 20px;

}
</style>