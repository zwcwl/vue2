<template>
	<div id="table-content">
		<div class="action">
			<el-button type="primary" @click="dialogShow">添加</el-button>
			<el-button type="danger" @click="handlePatchDel">批量删除</el-button>
		</div>

		<el-table @selection-change="handleSelectionChange" ref="multipleTable" :data="userList" tooltip-effect="dark"
			style="width: 100%" stripe border>
			<el-table-column type="selection" width="46"></el-table-column>

			<el-table-column v-for="item in columns" :key="item.prop" :label="item.label" :prop="item.prop"
				:formatter="item.formatter" :width="item.width">
			</el-table-column>

			<el-table-column label="操作" width="143px">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination background layout="prev, pager, next" :total="paging.total" @current-change="handelCurrentChange">
		</el-pagination>
	</div>
</template>

<script>
export default {
	data () {
		return {
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
					prop: "userEmail"
				},
				{
					label: "用户角色",
					prop: "role",
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
					prop: "state",
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
					prop: "createTime"
				},
				{
					label: "最后登入时间",
					prop: "lastLoginTime"
				}
			],
			paging: {
				pageNum: 1,
				pageSize: 10,
				total: 90
			},
			userList: [],
		}
	},
	methods: {
		//点击删除按钮，删除单个表格
		async handleDelete (index, row) {
			await this.$api.delUser({ userIds: [row.userId] })
			this.$message({
				message: '恭喜你，这是一条成功消息',
				type: 'success'
			});
		},

		//点击编辑用户
		handleEdit (index, row) {
			this.$bus.$emit("handleEdit", row)
		},

		//点击批量删除表格列表
		async handlePatchDel () {
			if (this.checkedUserIds.length === 0) {
				this.$message.error('请选择要批量删除的列表');
				return
			}
			await this.$api.delUser({ userIds: this.checkedUserIds })
			this.$message({
				message: '删除成功',
				type: 'success'
			});
		},

		//收集选中的表格列表
		handleSelectionChange (val) {
			let arr = []
			val.forEach(item => {
				arr.push(item.userId)
			})
			this.checkedUserIds = arr
		},

		//获取用户列表函数
		async getUser (queryForm = []) {
			let params = { ...this.paging, ...queryForm }
			try {
				let result = await this.$api.getUser(params)
				let { list, page } = result
				this.userList = list
				this.paging.total = page.total
			} catch (error) {
				console.log("🚀 ~ file: ManageView.vue ~ line 121 ~ getUserList ~ error", error)
			}
		},

		//点击左右分页按钮，取得当前的页码，重新请求列表
		handelCurrentChange (val) {
			console.log("🚀 ~ file: ManageView.vue ~ line 126 ~ handelCurrentChange ~ val", val)
			this.pager.pageNum = val
			this.getUser()
		},

		//点击显示添加表单
		dialogShow () {
			this.$bus.$emit("dialogShow")
		}
	},
	mounted () {
		this.getUser()
		this.$bus.$on("getUser", this.getUser)
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