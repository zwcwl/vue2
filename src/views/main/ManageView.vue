<template>
	<div id="manage-view">
		<div class="manage-container">
			<div class="query-form">
				<el-form :inline="true" :model="user" class="demo-form-inline" ref="formquery">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="user.username" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item label="用户ID" prop="userID">
						<el-input v-model="user.username" placeholder="请输入ID名"></el-input>
					</el-form-item>
					<el-form-item label="用户状态">
						<el-select v-model="user.userID" placeholder="用户状态">
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
				<el-table ref="multipleTable" :data="userList" tooltip-effect="dark" style="width: 100%" stripe border
					@selection-change="handleSelectionChange">
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
				username: "",
				userID: ""
			},
			userList: [

			],
			columns: [
				{
					label: "用户ID",
					prop: "userID"
				},
				{
					label: "用户名",
					prop: "username"
				},
				{
					label: "用户邮箱",
					prop: "userEmail"
				},
				{
					label: "用户角色",
					prop: "userRole"
				},
				{
					label: "用户状态",
					prop: "userState"
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
			multipleSelection: []
		}
	},
	methods: {
		onSubmit () {

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
		handleSelectionChange (val) {
			this.multipleSelection = val;
		}
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
		}
	}
}
</style>