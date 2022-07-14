<template>
	<div id="table-content">
		<div class="action">
			<el-button type="primary" @click="menuDialogShow('globalCreate')">新增</el-button>
		</div>

		<el-table ref="multipleTable" :data="roleList" tooltip-effect="dark" style="width: 100%" stripe border row-key="_id">

			<el-table-column v-for="item in columns" :key="item.prop" :label="item.label" :prop="item.prop"
				:formatter="item.formatter" :width="item.width">
			</el-table-column>

			<el-table-column label="操作" width="260px">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="menuDialogShow('localityCreate', scope.row)">编辑</el-button>
					<el-button size="mini" type="info" @click="menuDialogShow('update', scope.row)">设置权限</el-button>
					<el-button size="mini" type="danger" @click="handleDel(scope.row._id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" :total="page.total" @current-change="handelCurrentChange">
		</el-pagination>
	</div>
</template>

<script>
import dateFormat from "@/utils/dateFormat"
export default {
	name: "TableContent",
	props:["roleList","updateRole","page"],
	data () {
		return {
			actions: "",
			columns: [
				{
					label: "角色名称",
					prop: "roleName",
				},
				{
					label: "备注",
					prop: "remark",
				},
				{
					label: "权限列表",
					prop: "roleList",
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
		async handleDel (id) {
			try {
				console.log(id);
				await this.$api.delMenu(id)
				this.$bus.$emit("onSubmit")
				this.$message.success("删除成功");
			} catch (error) {
				this.$message.success("删除失败");
			}
		},

		//获取用户列表函数
		async getRole (queryForm = []) {
			try {
				let res = await this.$api.getRole(queryForm)
				this.updateRole(res)
			} catch (error) {
				console.log(error)
			}
		},

		//点击显示添加表单
		menuDialogShow (dialogType, row) {
			this.$bus.$emit("menuDialogShow", dialogType,row)
		},

		//点击左右分页按钮，取得当前的页码，重新请求列表
		handelCurrentChange (val) {
			this.pager.pageNum = val
			this.$bus.$emit("onSubmit")
		},
	},
	created () {
		this.$bus.$on("getRole", this.getRole)
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