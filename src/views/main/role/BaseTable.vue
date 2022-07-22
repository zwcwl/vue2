<template>
	<div id="base-table">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-button type="primary" @click="roleOpenDialog('create')">新增</el-button>
			</div>
			<div class="table">
				<el-table ref="multipleTable" :data="roleList" tooltip-effect="dark" style="width: 100%" stripe border
					row-key="_id">
					<el-table-column v-for="item in columns" :key="item.prop" :label="item.label" :prop="item.prop"
						:formatter="item.formatter" :width="item.width">
					</el-table-column>

					<el-table-column label="操作" width="260px">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="roleOpenDialog('update', scope.row)">编辑</el-button>
							<el-button size="mini" type="info" @click="permissionOpenDialog(scope.row)">设置权限</el-button>
							<el-button size="mini" type="danger" @click="handleDel(scope.row._id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination class="page" background layout="prev, pager, next" :total="page.total" @current-change="handleCurrentChange">
				</el-pagination>
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
			roleList: [],
			page:{
				pageNum:1,
				pageSize:10,
			},
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
					prop: "permissionList",
					formatter (row, column, value) {
						let names = []
						let arr = {
							"600d525e602f452aaeeffcd9": "用户管理"
						}
						let list = value.halfCheckedKeys || []
						list.map(key => {
							if (key) {
								names.push(arr[key])
							}
						})
						return names
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
		async handleDel (id) {
			try {
				await this.$api.delRole(id)
				this.$bus.$emit("querySubmit")
				this.$message.success("删除成功");
			} catch (error) {
				this.$message.success("删除失败");
			}
		},

		//获取用户列表函数
		async getRole (queryForm = []) {
			try {
				let {page,list} = await this.$api.getRole({...queryForm,...this.page})
				this.roleList=list
				this.page=page
			} catch (error) {
				console.log(error)
			}
		},

		//点击显示添加表单
		roleOpenDialog (dialogType, row) {
			this.$bus.$emit("roleOpenDialog", dialogType, row)
		},

		permissionOpenDialog (row) {
			this.$bus.$emit("permissionOpenDialog", row)
		},

		//点击左右分页按钮，取得当前的页码，重新请求列表
		handleCurrentChange (val) {
			this.pager.pageNum = val
			this.$bus.$emit("querySubmit")
		},
	},
	created () {
		this.$bus.$on("getRole", this.getRole)
	}
}
</script>

<style lang="scss">
#base-table {
	margin-top: 20px;

	.page {
		margin-top: 20px;
		text-align: right;
	}
}
</style>