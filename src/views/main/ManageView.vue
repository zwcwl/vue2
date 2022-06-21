<template>
	<div id="manage-view">
		<div class="manage-container">
			<div class="query-form">
				<el-form :inline="true" :model="user" class="demo-form-inline" ref="formquery">
					<el-form-item label="用户名" prop="userName">
						<el-input v-model="user.userName" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item label="用户ID" prop="userId">
						<el-input v-model="user.userId" placeholder="请输入ID名"></el-input>
					</el-form-item>
					<el-form-item label="用户状态">
						<el-select v-model="user.userState" placeholder="用户状态">
							<el-option label="所有" :value="0"></el-option>
							<el-option label="在职" :value="1"></el-option>
							<el-option label="离职" :value="2"></el-option>
							<el-option label="试用期" :value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">查询</el-button>
						<el-button type="primary" @click="onReset('formquery')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="base-table">
				<div class="action">
					<el-button type="primary">添加</el-button>
					<el-button type="danger" @click="handlePatchDel">批量删除</el-button>
				</div>
				<el-table @selection-change="handleSelectionChange" ref="multipleTable" :data="userList"
					tooltip-effect="dark" style="width: 100%" stripe border>
					<el-table-column type="selection" width="46">
					</el-table-column>
					<el-table-column v-for="item in columns" :key="item.prop" :label="item.label" :prop="item.prop"
						:formatter="item.formatter" :width="item.width">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination background layout="prev, pager, next" :total="pager.total"
					@current-change="handelCurrentChange"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ManageView",
	data() {
		return {
			user: {
				userName: "",
				userId: "",
				userState: 1
			},
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
					prop: "userEmail"
				},
				{
					label: "用户角色",
					prop: "role",
					width: "60px",
					formatter(row, column, value) {
						return {
							0: "管理员",
							1: "普通用户"
						}[value]
					}
				},
				{
					label: "用户状态",
					prop: "state",
					width: "60px",
					formatter(row, column, value) {
						return {
							1: "在职",
							2: "离职",
							3:"试用期"
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
			pager: {
				pageNum: 1,
				pageSize: 10,
				total: 90
			},
			checkedUserIds: []
		}
	},
	methods: {
		//点击搜索用户
		onSubmit() {
			this.getUserList()
		},

		//点击重置表单
		onReset(formName) {
			this.$refs[formName].resetFields();
		},

		//
		toggleSelection(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},

		//获取用户列表函数
		async getUserList() {
			let params = { ...this.pager, ...this.user }
			try {
				let result = await this.$api.getUserList(params)
				let { list, page } = result
				this.userList = list
				this.pager.total = page.total
			} catch (error) {
				console.log("🚀 ~ file: ManageView.vue ~ line 121 ~ getUserList ~ error", error)
			}
		},

		//点击左右分页按钮，取得当前的页码，重新请求列表
		handelCurrentChange(val) {
			console.log("🚀 ~ file: ManageView.vue ~ line 126 ~ handelCurrentChange ~ val", val)
			this.pager.pageNum = val
			this.getUserList()
		},

		//点击删除按钮，删除单个表格
		async handleDelete(index, row) {
			console.log(index, row)

			await this.$api.userDel({ userIds: [row.userId] })
			this.$message({
				message: '恭喜你，这是一条成功消息',
				type: 'success'
			});
		},
		handleEdit() {

		},

		//点击批量删除表格列表
		async handlePatchDel() {
			if (this.checkedUserIds.length === 0) {
				this.$message.error('请选择要批量删除的列表');
				return
			}
			await this.$api.userDel({ userIds: this.checkedUserIds })
			this.$message({
				message: '删除成功',
				type: 'success'
			});
		},

		//收集选中的表格列表
		handleSelectionChange(val) {
			let arr = []
			val.forEach(item => {
				arr.push(item.userId)
			})
			this.checkedUserIds = arr
		}
	},
	mounted() {
		this.getUserList()
	}
}
</script>

<style lang="scss">
#manage-view {
	padding: 20px;
	height: 100%;
	box-sizing: border-box;

	.manage-container {
		height: 100%;
		box-sizing: border-box;

		.query-form {
			padding: 20px;
			background-color: #fff;

			.el-form-item {
				margin-bottom: 0;
			}
		}

		.base-table {
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
	}
}
</style>