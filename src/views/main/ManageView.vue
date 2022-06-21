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
							<el-option label="所有" :value="1"></el-option>
							<el-option label="在职" :value="2"></el-option>
							<el-option label="离职" :value="3"></el-option>
							<el-option label="试用期" :value="4"></el-option>
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
					<el-button type="danger">批量删除</el-button>
				</div>
				<el-table ref="multipleTable" :data="userList" tooltip-effect="dark" style="width: 100%" stripe border>
					<el-table-column type="selection" width="46">
					</el-table-column>
					<el-table-column v-for="item in columns" :key="item.prop" :label="item.label" :prop="item.prop"
						:width="item.width">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination background layout="prev, pager, next" :total="pager.total" @current-change="handelCurrentChange"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ManageView",
	data () {
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
					prop: "userId"
				},
				{
					label: "用户名",
					prop: "userName"
				},
				{
					label: "用户邮箱",
					prop: "userEmail"
				},
				{
					label: "用户角色",
					prop: "role"
				},
				{
					label: "用户状态",
					prop: "state"
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
			}  
		}
	},
	methods: {
		onSubmit () {
			this.getUserList()
		},
		onReset (formName) {
			this.$refs[formName].resetFields();
		},
		toggleSelection (rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		async getUserList () {
			let params = { ...this.pager, ...this.user }
			try {
				let result = await this.$api.getUserList(params)
				let { list, page } = result
				this.userList = list
				// this.pager.total = page.total               
			} catch (error) {
				console.log("🚀 ~ file: ManageView.vue ~ line 121 ~ getUserList ~ error", error)
			}
		},
		handelCurrentChange(val){
      console.log("🚀 ~ file: ManageView.vue ~ line 126 ~ handelCurrentChange ~ val", val)
			this.pager.pageNum=val
			this.getUserList()
		}
	},
	mounted () {
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

			.el-pagination{
				margin-top: 20px;
				text-align: right;
			}
		}
	}
}
</style>