<template>
	<div id="base-table">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<el-button type="primary" @click="userOpenDialog('create')">添加</el-button>
				<el-button type="danger" @click="handlePatchDel">批量删除</el-button>
			</div>
			<div class="table">
				<el-table @selection-change="handleSelectionChange" ref="multipleTable" :data="userList" tooltip-effect="dark"
					style="width: 100%" stripe border>
					<el-table-column type="selection" width="46"></el-table-column>

					<el-table-column v-for="item in columns" :key="item.prop" :label="item.label" :prop="item.prop"
						:formatter="item.formatter" :width="item.width">
					</el-table-column>

					<el-table-column label="操作" width="143px">
						<template slot-scope="scope">
							<el-button size="mini" @click="userOpenDialog('update', scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
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
			userList: [],
			columns: [
				{
					label: "用户ID",
					prop: "userId",
					width: "80px"
				},
				{
					label: "用户名",
					prop: "userName",
					width: "80px"
				},
				{
					label: "用户邮箱",
					prop: "userEmail",
					width: "180px"
				},
				{
					label: "用户角色",
					prop: "userRole",
					width: "80px",
					formatter (row, column, value) {
						return {
							0: "管理员",
							1: "普通用户"
						}[value]
					}
				},
				{
					label: "用户状态",
					prop: "userState",
					width: "80px",
					formatter (row, column, value) {
						return {
							1: "在职",
							2: "离职",
							3: "试用期"
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
					label: "最后登入时间",
					prop: "lastLoginTime",
					formatter (row, column, value) {
						return dateFormat(value)
					}
				}
			],
			page: {
				pageNum: 1,
				pageSize: 10
			},
			checkedUserIds: [],
			actions: ""
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

		//点击批量删除表格列表
		async handlePatchDel () {
			if (this.checkedUserIds.length === 0) {
				this.$message.error('请选择要批量删除的列表');
				return
			}
			try {
				await this.$api.delUser({ userIds: this.checkedUserIds })
				this.$bus.$emit("onSubmit")
			} catch (error) {
				this.$message.success("删除失败");
			}
		},

		//收集选中的表格列表userId
		handleSelectionChange (val) {
			let arr = []
			val.forEach(item => {
				arr.push(item.userId)
			})
			this.checkedUserIds = arr
		},

		//获取用户列表函数
		async getUser (queryForm) {
			let params = { ...this.page, ...queryForm }
			try {
				let { list, page } = await this.$api.getUser(params)
				this.userList = list
				this.page.total = page.total
			} catch (error) {
				console.log(error)
			}
		},

		//点击左右分页按钮，取得当前的页码，重新请求列表
		handleCurrentChange (val) {
			this.pager.pageNum = val
			this.$bus.$emit("querySubmit")
		},

		//点击显示添加表单
		userOpenDialog (dialogType, row) {
			this.$bus.$emit("userOpenDialog", dialogType, row)
		}
	},
	created () {
		this.$bus.$on("getUser", this.getUser)
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